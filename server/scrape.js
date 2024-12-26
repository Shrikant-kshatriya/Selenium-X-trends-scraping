const { By, Builder, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

const scrape = async () => {
  const extensionPath = path.resolve(__dirname, "proxy-extension.zip"); 

  // Configure Chrome Options
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--ignore-certificate-errors");
  chromeOptions.addExtensions(extensionPath); // loading extension

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  await driver
    .manage()
    .setTimeouts({ implicit: 20000, pageLoad: 60000, script: 60000 });

  try {
    // Fetch IP address to verify the proxy is working
    await driver.get("https://icanhazip.com/");
    const ip = await driver.findElement(By.css("body")).getText();
    console.log("Current IP:", ip);

    // Login process
    await driver.get("https://x.com/i/flow/login");
    await driver.get("https://x.com/i/flow/login");

    // Step 1: First input (email or username)
    await driver.wait(() => 
        driver.findElement(By.css('input')).isDisplayed(), 60000);
      
      const firstInput = await driver.findElement(By.css('input'), 30000);
      const firstInputType = await firstInput.getAttribute("autocomplete");
  
      if (firstInputType === "username" || firstInputType === null) {
        // Enter username and proceed
        await firstInput.sendKeys(process.env.X_USERNAME, Key.RETURN);
        await driver.sleep(2000);
  
        // Check if email input is requested
        if (await driver.findElements(By.css('input[name="text"]')).then((els) => els.length > 0)) {
          const emailInput = await driver.findElement(By.css('input[name="text"]'));
          await emailInput.sendKeys(process.env.X_EMAIL, Key.RETURN);
        }
      } else {
        // Enter email and proceed
        await firstInput.sendKeys(process.env.X_EMAIL, Key.RETURN);
  
        // Check if username is requested
        if (await driver.findElements(By.css('input[name="text"]')).then((els) => els.length > 0)) {
          const usernameInput = await driver.findElement(By.css('input[name="text"]'));
          await usernameInput.sendKeys(process.env.X_USERNAME, Key.RETURN);
        }
      }
  
      // Step 2: Password input
      await driver.wait(until.elementLocated(By.css('input[name="password"]')), 10000);
      const passwordInput = await driver.findElement(By.css('input[name="password"]'));
      await passwordInput.sendKeys(process.env.X_PASSWORD, Key.RETURN);
  
      // Wait for /home URL
      await driver.wait(until.urlContains("/home"), 10000);
      await driver.wait(() => 
        driver.findElement(By.css("div[aria-label='Timeline: Trending now'] div[id]")).isDisplayed(), 100000);

    const trendDivs = await driver.findElements(
      By.css("div[aria-label='Timeline: Trending now'] div[id]")
    );
    // extracting trends
    const trends = await Promise.all(
      trendDivs.map(async (div) => {
        const childDivs = await div.findElements(By.css("div")); 
        if (childDivs[2]) {
          return await childDivs[2].getText(); 
        }
        return null; 
      })
    );

    return { trends, ip };
  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    driver.quit();
  }
};

module.exports = scrape;
