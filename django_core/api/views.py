from rest_framework import views, response


class TestView(views.APIView):
    def get(self, request, *args, **kwargs):
        return response.Response({'Method GET': 'Hello from GET'})
