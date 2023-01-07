import os
import bcrypt
import magic
from flask import Flask, jsonify, request, session, send_file
from utils.db.connection import data_base
from utils.handler import process_archive
from flask_cors import CORS
from dotenv import load_dotenv
from utils.send_mail import send_email, send_archive_to_email
from utils.storage.main import upload_file, list_files, delete_file
from utils.publish_message import publish_message
from werkzeug.utils import secure_filename
from threading import Timer


load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body['email']
    password = body['password'].encode('utf-8')

    user = [user.to_dict() for user in data_base.collection(u'users').where(u"email", u"==", email)
            .limit(1).stream()][0]

    if bcrypt.checkpw(password, user['password'].encode('utf-8')):
        session['user'] = user['email']
        return jsonify({"success": True})

    return jsonify({"success": False})


@app.route('/logout', methods=['POST'])
def logout():
    if session['user']:
        session.pop('user')
        return jsonify({"success": True})

    return jsonify({"success": False})


@app.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body['email']

    user = [user.to_dict() for user in data_base.collection(u'users').where(u"email", u"==", email).stream()]
    if len(user) == 0:
        body['password'] = bcrypt.hashpw(body['password'].encode('utf-8'), bcrypt.gensalt())
        data_base.collection('users').document().set(body)
        send_email(email, "New account", "Welcome to Human Detection App!")
        return jsonify({"success": True})

    return jsonify({"error": "email_used"})


@app.route('/archive/list/<string:email>', methods=['GET'])
def list_archives(email):
    try:
        files = list_files(email)
        return jsonify(files)
    except Exception:
        return jsonify({"error": True})


@app.route('/archive/delete/<string:email>/<string:file_name>', methods=['DELETE'])
def delete_archive(email, file_name):
    try:
        stat = delete_file(file_name, email)
        if stat is True:
            return jsonify({"success": True})
        return jsonify({"error": True})

    except Exception:
        return jsonify({"error": True})


@app.route('/archive/get', methods=['GET'])
def get_archive():
    try:
        pass
    except Exception:
        return jsonify({"error": True})


@app.route('/archive/add', methods=['POST'])
def add_archive():
    try:
        if 'archive' not in request.files:
            return jsonify({"error": True})
        archive = request.files['archive']
        if archive.filename == '':
            return jsonify({"error": True})

        email = request.form['email']
        user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
                   .limit(1).stream()][0]

        if user_id:
            user_id = str(user_id).lower()
            if not os.path.exists(f'./{user_id}/'):
                os.makedirs(f'./{user_id}/')

            filename = secure_filename(archive.filename)
            archive.save(os.path.join(f'./{user_id}', filename))
            process_archive(f'./{str(user_id)}/{filename}', filename)

            _ = send_archive_to_email(email, 'Archive from HumanDetection App', 'Your archive is in attachments',
                                      f'./{user_id}/{filename}')
            _ = upload_file(f'./{user_id}/{filename}', filename, email)

            mime = magic.Magic(mime=True)
            file_type = mime.from_file(f'./{user_id}/{filename}')

            t = Timer(60, publish_message, [user_id])
            t.start()

            return send_file(f'./{user_id}/{filename}', mimetype=file_type)

    except Exception:
        return jsonify({"error": True})


if __name__ == '__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5001
    )
