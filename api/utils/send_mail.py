import os
import sendgrid
import base64
import magic
from sendgrid.helpers.mail import *
from dotenv import load_dotenv


load_dotenv()
sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SEND_GRID_API_KEY'))


def send_email(to_email, subject, content):
    try:
        from_email = Email(os.getenv("EMAIL_SENDER"))
        to_email = To(to_email)
        content = Content("text/plain", content)
        mail = Mail(from_email, to_email, subject, content)
        _ = sg.client.mail.send.post(request_body=mail.get())
    except Exception as e:
        print(e)


def send_archive_to_email(to_email, subject, content, archive_name):
    try:
        from_email = Email(os.getenv("EMAIL_SENDER"))
        to_email = To(to_email)
        content = Content("text/plain", content)
        mail = Mail(from_email, to_email, subject, content)

        mime = magic.Magic(mime=True)
        file_type = mime.from_file(archive_name)

        with open(archive_name, 'rb') as f:
            data = f.read()
            f.close()
        encoded_file = base64.b64encode(data).decode()

        attachedFile = Attachment(
            FileContent(encoded_file),
            FileName(archive_name),
            FileType(file_type),
            Disposition('attachment')
        )
        mail.attachment = attachedFile

        response = sg.client.mail.send.post(request_body=mail.get())
        return response

    except Exception as e:
        print(e)
