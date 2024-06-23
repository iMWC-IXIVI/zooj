from base.base_page import BasePage
from config.links import Links
from selenium.webdriver.support import expected_conditions as EC

class AccountPage(BasePage):

    PAGE_URL = Links.ACCOUNT_PAGE

    FIELD_FIO = ('xpath', '//input[@name="name"]')
    FILED_PHONE = ('xpath', '//input[@name="number"]')
    BUTTON_SUBMIT = ('xpath', '//button[@type="submit"]')

    def enter_FIO(self, fio):
        self.wait.until(EC.element_to_be_clickable(self.FIELD_FIO)).send_keys(fio)

    def enter_phone_number(self, phone_number):
        self.wait.until(EC.element_to_be_clickable(self.FILED_PHONE)).send_keys(phone_number)

    def click_submit_button(self):
        self.wait.until(EC.element_to_be_clickable(self.BUTTON_SUBMIT)).click()

    def change_FIO(self, new_name):
        field_fio = self.wait.until(EC.element_to_be_clickable(self.FIELD_FIO))
        field_fio.clear()
        field_fio.get_attribute('value') == '', 'There is text'
        field_fio.send_keys(new_name)
        self.name = new_name

    def is_changes_saved(self):
        self.wait.until(EC.text_to_be_present_in_element_value(self.FIELD_FIO, self.name))