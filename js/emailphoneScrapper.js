const scrapEmailPhoneData = async () => {
    var data = await scrappingPosts();
    return data;
}

async function scrappingPosts() {
    let data = [];

    let commentBoxes = document.querySelectorAll('.comments-comments-list');
    totalCommentBoxes = commentBoxes.length;
    commentBoxes.forEach(async (commentBox, n) => {
        let parent = commentBox.parentElement.parentElement.parentElement;
        let commentOwner;
        if (parent.querySelector('.update-components-actor__name')) {
            commentOwner = parent.querySelector('.update-components-actor__name').innerText;
        }
        else {
            commentOwner = parent.querySelector('.feed-shared-actor__name').innerText;
        }
        let userProfile = {};
        let comments = commentBoxes[n].firstElementChild;

        let inerDataArray = await scrappingCommentsFromPost(comments);

        userProfile['owner'] = await commentOwner;
        userProfile['data'] = inerDataArray;
        data.push(userProfile)

    });
    return data;
}

var emailPhoneScraperCounter = 0;

async function scrappingCommentsFromPost(comments) {
    let inerDataArray = []
    let commentArr = comments.querySelectorAll('.comments-comment-item');

    let j = 0;
    let variable = setInterval(async () => {

        if (emailPhoneScraperCounter >= commentArr.length) {
            clearInterval(variable);
        }

        for (j; j < emailPhoneScraperCounter + 4 && j < commentArr.length; j++) {
            let comment = commentArr[j];

            let name = comment.querySelector('.hoverable-link-text').innerText.split('\n')[0];
            let text = comment.querySelector('.feed-shared-main-content--comment').innerText;
            let link = comment.querySelector('.tap-target').getAttribute('href');
            if (!link.includes('linkedin.com')) {
                link = 'https://www.linkedin.com' + link;
            }

            let email = text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            let phone = text.match(/[\+]?\d{10}|\(\d{3}\)\s?-\d{6}/);


            // if only email found in an comment
            if (email && !phone) {
                extractingComapanyFromProfile(link).then(function (company_details) {
                    let eachCommentData = {
                        name: name,
                        link: link,
                        email: email,
                        company_details: company_details
                    }

                    inerDataArray.push(eachCommentData);
                })
            }
            else if (!email && phone) { // if only phone found in an comment
                extractingComapanyFromProfile(link).then(function (company_details) {
                    let eachCommentData = {
                        name: name,
                        link: link,
                        phone: phone[0],
                        company_details: company_details
                    }


                    inerDataArray.push(eachCommentData);
                })
            }
            else if (email && phone) { // if both email and phone found 

                extractingComapanyFromProfile(link).then(function (company_details) {
                    let eachCommentData = {
                        name: name,
                        link: link,
                        email: email,
                        phone: phone[0],
                        company_details: company_details
                    }

                    inerDataArray.push(eachCommentData);
                })
            }
        }

    }, 100);

    return inerDataArray;

}


const extractingComapanyFromProfile = async (link) => {

    return new Promise(function (resolve) {
        //inserting iframe to the page for scrapping profile data
        let frame = document.createElement('iframe');
        frame.setAttribute('src', link);

        // frame.style.display = "none";

        frame.setAttribute('name', 'iframe_get_data');
        frame.id = 'iframe_get_data'
        document.body.appendChild(frame);


        $('iframe[name=iframe_get_data]').on('load', function () {
            //getting body data of iframe
            let elem = document.getElementById('iframe_get_data').contentWindow.document.getElementsByTagName('body')[0];
            let experience = elem.querySelector('#experience'); //getting whole experience card
            if (experience) {
                ++emailPhoneScraperCounter;

                let latestCompany = experience.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild; //traversing to first company

                let companyData = latestCompany.innerText.split('\n');
                let companyDetails = []
                let j = 0;
                for (let i = 0; i < companyData.length; i += 2, j++) {
                    companyDetails[j] = companyData[i];
                }

                document.querySelector('#iframe_get_data').remove();
                resolve(companyDetails)
            }
            else {
                document.querySelector('#iframe_get_data').remove();
                resolve("No Data")
            }
        });
    })
}