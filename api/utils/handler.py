import os
import cv2
import numpy as np
import cvlib as cv
from PIL import Image
from cvlib.object_detection import draw_bbox
import zipfile


def counter(np_buf, doc_name, filename, user_id):
    img = cv2.imdecode(np_buf, cv2.IMREAD_UNCHANGED)
    box, label, count = cv.detect_common_objects(img)

    nr = len(label)
    index = 0
    while nr > 0:
        if label[index] != "person":
            label.pop(index)
            box.pop(index)
            count.pop(index)
            nr -= 1
        nr -= 1
        index += 1

    output = draw_bbox(img, box, label, count)
    output = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)

    im = Image.fromarray(output)
    im.save(doc_name)

    z = zipfile.ZipFile(f'./{user_id}/{filename}', "a")
    z.write(doc_name)
    os.remove(doc_name)


def process_archive(archive_path, filename, user_id):
    with zipfile.ZipFile(archive_path, "r") as z:
        os.remove(archive_path)
        for name in z.namelist():
            buf = z.read(name)
            np_buf = np.frombuffer(buf, np.uint8)
            counter(np_buf, z.getinfo(name).filename, filename, user_id)
