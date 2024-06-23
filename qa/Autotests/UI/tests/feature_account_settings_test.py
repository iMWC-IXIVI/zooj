import random
import pytest
from base.base_test import BaseTest

class TestAccountSettings(BaseTest):

    # @pytest.mark.smoke
    # def test_enter_info(self):
    #     self.account_page.open()
    #     self.account_page.enter_FIO(f'Test name {random.randint(1, 100)}')
    #     self.account_page.enter_phone_number(random.randint(9000000000, 9999999999))

    @pytest.mark.smoke
    def test_link_work(self):
        self.main_page.open()
        self.main_page.click_link_button()
        self.ready_program_page.is_opened()
        self.ready_program_page.click_button_soup()