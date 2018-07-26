import random
import os

from django.conf import settings
from django.views import View
from django.shortcuts import render
from pdf2image import convert_from_bytes


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
        return render(request, 'process/index.html', context={'images': img_path_list})
