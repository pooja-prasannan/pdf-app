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
        # try :

        file = request.FILES['file']
        images = convert_from_bytes(file.read())
        img_path_list = []
        i = 1
        for image in images:
            img_path = os.path.join('images',  "image{}.png".format(i))

            i=i+1
            image.save(os.path.join(settings.MEDIA_ROOT, img_path))
            img_path_list.append(os.path.join(settings.MEDIA_URL, img_path))

        return render(request, 'process/index.html', {
            'images': img_path_list,
            'json_images': json.dumps(img_path_list)
        })
        # except:
        #     print("no file selected")
        return render(request, 'process/index.html')


class Base64ImageView(View):
    def get(self, request):
        return render(request, 'process/index.html')

    def post(self, request):

        try:

            json_data = json.loads(request.body.decode('utf-8'))

            if json_data.get('action') == 'edit_image':
                image_url = json_data.get('croppedImage')
                image_id = "image{}".format(json_data.get('image_ids'))
                encoded_image = image_url.split(',')[-1]
                imgdata = base64.standard_b64decode(encoded_image)
                image_result = open(os.path.join(settings.MEDIA_ROOT, image_id + '.png'), 'wb')
                img_url = '%s%s.png' % (settings.MEDIA_URL, image_id)
                image_result.write(imgdata)
                image_result.seek(0, 0)

            if json_data.get('action') == 'add_image':
                img_lis = []
                image_url_lis = json_data.get('front_cover')
                id_max = json_data.get('id_max')
                for i, img_url in enumerate(image_url_lis):
                    encoded_image = img_url.split(',')[-1]
                    image_id = "image{}".format(id_max+i+1)
                    imgdata = base64.standard_b64decode(encoded_image)
                    if 'png' in img_url:
                        image_type = '.png'
                    if 'jpeg' in img_url:
                        image_type = '.jpg'
                    image_result = open(os.path.join(settings.MEDIA_ROOT, 'images', image_id + image_type), 'wb')
                    url = "{}images/{}{}".format(settings.MEDIA_URL, image_id, image_type)
                    img_lis.append(url)
                    image_result.write(imgdata)
                    image_result.seek(0, 0)

                img_url = img_lis


        except Exception as e:

            img_url = ''
        return JsonResponse({'img_url': img_url})



class DemoView(TemplateView):
    template_name = "process/demo.html"


from PIL import Image
import json

class MergeImageView(View):

    def post(self, request):
        json_data = json.loads(request.body.decode('utf-8'))
        img_lis = []
        components = ['front_cover', 'back_cover', 'total_tabs', 'total_stacks']
        book_attr_data = json_data.get('book_attribute')
        save_book_attributes(book_attr_data)
        merge_img_data = eval(json_data.get('merge_image'))
        for cmp in components[:2]:
            data = merge_img_data.get(cmp)
            d = list(map(int, data))
            it = iter(d)
            for id, x in enumerate(it):
                image_id = "{}{}.png".format(cmp, id)
                try:
                    merge_image([x, next(it)], image_id)
                    url = "{}images/{}".format(settings.MEDIA_URL, image_id)
                    img_lis.append(url)
                except Exception as e:
                    image_id = "{}{}.png".format(cmp, id)
                    old_image = open(os.path.join(settings.MEDIA_ROOT, 'images', "image{}.png".format(x)), 'rb').read()
                    new_img = open(os.path.join(settings.MEDIA_ROOT, 'images', image_id), 'wb')
                    new_img.write(old_image)
                    url = "{}images/{}".format(settings.MEDIA_URL, image_id)
                    img_lis.append(url)

        for cmp in components[2:]:
            for i, each in enumerate(merge_img_data.get(cmp)):

                d = list(map(int, each))
                it = iter(d)
                for id, x in enumerate(it):

                    image_id = "{}{}_{}.png".format(cmp, i, id)
                    try:
                        merge_image([x, next(it)], image_id)
                        url = "{}images/{}".format(settings.MEDIA_URL, image_id)
                        img_lis.append(url)
                    except Exception as e:
                        image_id = "{}{}_{}.png".format(cmp, i, id)
                        old_image = open(os.path.join(settings.MEDIA_ROOT, 'images', "image{}.png".format(x)), 'rb').read()
                        new_img = open(os.path.join(settings.MEDIA_ROOT, 'images', image_id), 'wb')
                        new_img.write(old_image)
                        url = "{}images/{}".format(settings.MEDIA_URL, image_id)
                        img_lis.append(url)

        return JsonResponse({'img_url': img_lis})


def merge_image(image_merge_list, image_id):

    image_path_list = list(map(lambda x: os.path.join(settings.MEDIA_ROOT, 'images', "image"+str(x))+".png", image_merge_list))
    images = list(map(Image.open, list(image_path_list)))

    widths, heights = zip(*(i.size for i in images))

    total_width = sum(widths)
    max_height = max(heights)

    new_im = Image.new('RGB', (total_width, max_height))

    x_offset = 0
    for im in images:
        new_im.paste(im, (x_offset, 0))
        x_offset += im.size[0]

    new_im.save(os.path.join(settings.MEDIA_ROOT, 'images', image_id))


def save_book_attributes(book_attr_data):
    json_file = open('book_attribute_data.json', 'a')
    json.dump(book_attr_data, json_file)
    json_file.write("\n")

