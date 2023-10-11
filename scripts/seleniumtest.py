from selenium import webdriver

driver_path = r'C:\Users\mlefa\OneDrive\Documents\HTML_CSS_JS_Projects\Testing' 

driver = webdriver.Edge(executable_path=driver_path)

driver.get("https://www.selenium.dev/selenium/web/web-form.html")

d.implicitly_wait(.5)
