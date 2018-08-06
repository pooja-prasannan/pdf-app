import json
import random
import os
import base64
from django.conf import settings
from django.views.generic import TemplateView
from django.views import View
from django.shortcuts import render
from django.http import JsonResponse
from pdf2image import convert_from_bytes


class CovertView(View):
    def get(self, request):
        return render(request, 'process/index.html')

    def post(self, request):
        try :

            file = request.FILES['file']
            images = convert_from_bytes(file.read())
            img_path_list = []
            for image in images:
                img_path = os.path.join('images', "{}.png".format(random.randint(1, 100000)))
                print("imag_path", img_path)
                image.save(os.path.join(settings.MEDIA_ROOT, img_path))
                img_path_list.append(os.path.join(settings.MEDIA_URL, img_path))
                print("list",img_path_list)
            return render(request, 'process/index.html', {
                'images': img_path_list,
                'json_images': json.dumps(img_path_list)
            })
        except:
            print("no file selected")
            return render(request, 'process/index.html')


class Base64ImageView(View):
    def get(self, request):
        return render(request, 'process/index.html')

    def post(self, request):

        try:

            json_data = json.loads(request.body.decode('utf-8'))
            image_url = json_data.get('croppedImage')
            image_id = "image{}".format(json_data.get('image_ids'))
            encoded_image = image_url.split(',')[-1]
            imgdata = base64.standard_b64decode(encoded_image)
            image_result = open(os.path.join(settings.MEDIA_ROOT, image_id + '.png'), 'wb')
            img_url = '%s%s.png' % (settings.MEDIA_URL, image_id)
            image_result.write(imgdata)
            image_result.seek(0, 0)
            print("img_url", img_url)
        except Exception as e:
            print(e)
            img_url = ''
        return JsonResponse({'img_url': img_url})
        # return render(request, 'process/index.html', context={
        #     'img_url': img_url
        #
        # })


class DemoView(TemplateView):
    template_name = "process/demo.html"

