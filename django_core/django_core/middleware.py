from rest_framework import response, renderers, status


class Error500:
    def __init__(self, get_response):
        self._get_response = get_response

    def __call__(self, request):
        return self._get_response(request)

    def process_exception(self, request, exception):
        response_exc = response.Response()
        response_exc.data = {'detail': 'error500'}
        response_exc.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        response_exc.accepted_renderer = renderers.JSONRenderer()
        response_exc.accepted_media_type = 'application/json'
        response_exc.renderer_context = {}
        response_exc.render()
        return response_exc
