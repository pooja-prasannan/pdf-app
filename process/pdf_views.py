import random
import os

from django.conf import settings
from django.views import View
from django.shortcuts import render
from pdf2image import convert_from_bytes


def handle_uploaded_file(f):
    with open(os.path.join(settings.MEDIA_ROOT, 'pdf', 'temp.pdf'), 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    return destination.name


class CovertView(View):
    def get(self, request):
        return render(request, 'process/index.html')

    def post(self, request):
        file = request.FILES['file']
        images = convert_from_bytes(file.read())
        img_path_list = []
        for image in images:
            img_path = os.path.join('images', "{}.png".format(random.randint(1, 100000)))
            image.save(os.path.join(settings.MEDIA_ROOT, img_path))
            img_path_list.append(os.path.join(settings.MEDIA_URL, img_path))
        print("file path>>>>>>>>>>>>>", img_path_list)
        return render(request, 'process/index.html', context={'images': img_path_list})
