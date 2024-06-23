from base.base_page import BasePage
from config.links import Links
from selenium.webdriver.support import expected_conditions as EC

class ReadyProgramPage(BasePage):

    PAGE_URL = Links.READY_PROGRAM_PAGE

    BUTTON_SOUP = ('xpath', '//div[text()="Супы"]')

    def enter_FIO(self, fio):
        self.wait.until(EC.element_to_be_clickable(self.FIELD_FIO)).send_keys(fio)

    def enter_phone_number(self, phone_number):
        self.wait.until(EC.element_to_be_clickable(self.FILED_PHONE)).send_keys(phone_number)

    def click_button_soup(self):
        self.wait.until(EC.element_to_be_clickable(self.BUTTON_SOUP)).click()