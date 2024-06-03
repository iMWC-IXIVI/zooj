class RegistrationAPIView(views.APIView):

    def post(self, request):

        data = request.data
        if not (data.get('username') and data.get('password') and data.get('password_confirmation') and data.get(
                'email') and data.get('phone')):
            return response.Response({'Ошибка', 'все поля обязательны к заполнению'},
                                     status=status.HTTP_400_BAD_REQUEST)
        if data.get('password') == data.get('password_confirmation'):
            del data['password_confirmation']
        else:
            return response.Response({'Ошибка': 'Пароли не совпадают'}, status=status.HTTP_400_BAD_REQUEST)

        token = f'{registration_token()}'
        RegistrToken.objects.create(token=token,
                                    username=request.data['username'],
                                    email=request.data['email'],
                                    password=request.data['password'],
                                    phone=request.data['phone'])
        html_content = f"""<h1>Здравствуйте!</h1>
        <p><a href='http://localhost:8000/api/{token}/'>Ссылка </a> для подтверждения регистрации </p>"""
        msg = EmailMultiAlternatives(to=['v.andrei_dmitrievich@mail.ru', ])
        msg.attach_alternative(html_content, 'text/html')
        msg.send()

        return response.Response({'Данные сохранены', 'Успешно'}, status=status.HTTP_200_OK)


@decorators.api_view()
def token_reg_func(request, **kwargs):
    token = kwargs['token']

    try:
        data = RegistrToken.objects.get(token=token)
    except:
        return response.Response({'Ошибка': 'токен'})

    CustomUser.objects.create_user(username=data.username,
                                   email=data.email,
                                   password=data.password,
                                   phone=data.phone)
    data.delete()

    return response.Response({'Токен': 'OK'})
