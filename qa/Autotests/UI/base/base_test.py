import pytest

from pages.account_page import AccountPage
from pages.main_page import MainPage
from pages.ready_program_page import ReadyProgramPage


class BaseTest:

    account_page: AccountPage
    main_page: MainPage
    ready_program_page: ReadyProgramPage

    @pytest.fixture(autouse=True)
    def setup(self, request, driver):
        request.cls.driver = driver
        request.cls.account_page = AccountPage(driver)
        request.cls.main_page = MainPage(driver)
        request.cls.ready_program_page = ReadyProgramPage(driver)