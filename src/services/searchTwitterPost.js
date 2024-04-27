
const puppeteer = require("puppeteer");
const consolelog = require("../utils/consolelog");
const Post = require("../models/Post");
const delay = require("../utils/delay");



module.exports = async ({url="https://twitter.com/coindesk"}) => {
  try {
    const get_latest_post= await Post.findOne({
      order: [['createdAt', 'DESC']], 
    });
    const browser= await puppeteer.launch({
      headless: false
    })
    const page= await browser.newPage()
    await page.goto(url)

    await page.waitForFunction(() => window.performance.getEntriesByType('resource').length === 0, {
      timeout: 5000,
    });
    await delay(5000)

    const testId = "cellInnerDiv"; // Replace with your CSS selector
    const tweets = await page.$$(`[data-testid="${testId}"]`); // `$$` finds all tweets matching the selector
    const numOfTweets = tweets.length;

    consolelog({numOfTweets})

    if(!numOfTweets){
      return await browser.close()
    }
    // omit the pinned tweet
    const arrangedTweets=tweets.slice(1).map((async (tweet_box)=>{
      
      // const arrangedTweet= await tweet_box.evaluate(async (twt_element) => {
        const time_tag=await tweet_box.$$('time')
        const datetimeValue = await time_tag.evaluate((time) => time.getAttribute("datetime"), time);
        // const tweet_id=element.parentNode.outerHTML;
        const tweet_id = await time_tag.evaluate((element) => {
          const parent = element.parentNode; // Get the parent node
          return parent ? parent.getAttribute("href") : null;
        }, time_tag);
        const rtwt_box=await tweet_box.$$('.r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-14j79pv r-10ptun7 r-1janqcz')
        const status= rtwt_box?'reposted':'tweet'
        // return  
      // }, tweet_box);
      // return arrangedTweet
    }))
    if(!get_latest_post){
      const insertedPost = await Post.bulkCreate(formu);
    }
    const last_tweet= tweets[numOfTweets-1]

    if(get_latest_post?.createdAt){

    }


    await browser.close()
  } catch (error) {
    console.log(error);
    return {error:{message:"could not search"}}
  }
};

