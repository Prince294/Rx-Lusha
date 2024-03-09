var my_scr = document.createElement('script')
document.getElementsByTagName('body')[0].appendChild(my_scr);
// scr.id="prateek"

var autoprof = 0;

var lastUrl = location.href;
new MutationObserver(() => {
    var url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
    }
}).observe(document, { subtree: true, childList: true });


function onUrlChange() {

    if (window.location.href.includes('https://www.linkedin.com/in/') && window.location.href.split('/').length == 6) {
        lastUrl = window.location.href;
        run_code();
    }

}


function prateekfun(t) {
    skillct = t.data.metadata.totalSkills;
    var st = 0, st1;
    for (let i = 0; i < t.included.length; i++) {
        if (t.included[i].$type == "com.linkedin.voyager.identity.profile.Skill") {
            st = i;
            break;
        }
    }
    for (let i = 0; i < t.included.length; i++) {
        if (typeof t.included[i].originalCategoryType == 'string') {
            st1 = i;
            break;
        }
    }
    for (let i = 0; i < skillct; i++) {
        let val = t.included[st++];
        skillname.push(val.name);
        for (let j = 0; j < t.included.length; j++) {
            if (typeof t.included[j].entityUrn == "string" && val.entityUrn == t.included[j].entityUrn.replace('fs_endorsedSkill', 'fs_skill')) {
                skilllevel.push(t.included[j].endorsementCount)
                break;
            }
        }
    }
    return;
}
var skilllevel = [];
var skillname = [];
var entityurn = '';
// SCHEMA CODE
var maxDaysOfMonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
};

/**
 * If less than 10, zero pad left
 * @param {number} n - Numerical input
 * @returns {string} Left padded, stringified num
 */
function zeroLeftPad(n) {
    if (n < 10) {
        return `0${n}`;
    }

    return n.toString();
}

/**
 * Returns month, padded to two digits
 * @param {Number} [m] month
 * @returns {string} month, padded to two digits
 */
function getMonthPadded(m) {
    if (!m) return `12`;

    return zeroLeftPad(m);
}

/**
 * Gets day, padded to two digits
 * @param {Number} d day
 * @param {Number} m month
 * @returns {string} day, padded to two digits
 */
function getDayPadded(d, m) {
    if (!d) {
        if (!m) return `31`;
        return maxDaysOfMonth[m].toString();
    }

    return zeroLeftPad(d);
}

/**
 * Parses an object with year, month and day and returns a string with the date.
 * If month is not present, should return 12, and if day is not present, should return last month day.
 * @param {LiDate} dateObj
 * @returns {string} Date, as string, formatted for JSONResume
 */
function parseDate(dateObj) {
    return dateObj && dateObj.year ? `${dateObj.year}-${getMonthPadded(dateObj.month)}-${getDayPadded(dateObj.day, dateObj.month)}` : '';
}

/**
 * Converts a LI Voyager style date object into a native JS Date object
 * @param {LiDate} liDateObj
 * @returns {Date} date object
 */
function liDateToJSDate(liDateObj) {
    // This is a cheat; by passing string + 00:00, we can force Date to not offset (by timezone), and also treat month as NOT zero-indexed, which is how LI uses it
    return new Date(`${parseDate(liDateObj)} 00:00`);
}

/**
 * Trigger a file download prompt with given content
 * @see https://davidwalsh.name/javascript-download
 * @param {string} data
 * @param {string} fileName
 * @param {string} [type]
 */
function promptDownload(data, fileName, type = 'text/plain') {
    // Create an invisible A element
    let a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);

    // Set the HREF to a Blob representation of the data to be downloaded
    a.href = window.URL.createObjectURL(new Blob([data], { type }));

    // Use download attribute to set set desired file name
    a.setAttribute('download', fileName);

    // Trigger download by simulating click
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

/**
 * Get a cookie by name
 * @param {string} name
 */
function getCookie(name) {
    let v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return v ? v[2] : null;
}

/**
 * Get URL response as base64
 * @param {string} url - URL to convert
 * @param {boolean} [omitDeclaration] - remove the `data:...` declaration prefix
 * @returns {Promise<{dataStr: string, mimeStr: string}>} base64 results
 */
async function urlToBase64(url, omitDeclaration = false) {
    let res = await fetch(url);
    let blob = await res.blob();
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            let declarationPatt = /^data:([^;]+)[^,]+base64,/i;
            let dataStr = /** @type {string} */ (reader.result);
            let mimeStr = dataStr.match(declarationPatt)[1];
            if (omitDeclaration) {
                dataStr = dataStr.replace(declarationPatt, '');
            }

            resolve({
                dataStr,
                mimeStr
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


function setQueryParams(url, paramPairs) {
    let urlInstance = new URL(url);
    /** @type {Record<string, any>} */
    let existingQueryPairs = {};
    urlInstance.searchParams.forEach((val, key) => {
        existingQueryPairs[key] = val;
    });
    urlInstance.search = new URLSearchParams({
        ...existingQueryPairs,
        ...paramPairs
    }).toString();
    return urlInstance.toString();
}


function noNullOrUndef(value, optDefaultVal) {
    let defaultVal = optDefaultVal || '';
    return typeof value === 'undefined' || value === null ? defaultVal : value;
}


function lazyCopy(inputObj, removeKeys = []) {
    let copied = JSON.parse(JSON.stringify(inputObj));
    removeKeys.forEach((k) => delete copied[k]);
    return copied;
}


function remapNestedLocale(liObject, desiredLocale, deep = true) {
    if (Array.isArray(liObject)) {
        liObject.forEach((o) => {
            remapNestedLocale(o, desiredLocale, deep);
        });
    } else {
        Object.keys(liObject).forEach((prop) => {
            let nestedVal = liObject[prop];
            if (!!nestedVal && typeof nestedVal === 'object') {
                // Test for locale wrapped property
                // example: `multiLocaleFirstName`
                if (prop.startsWith('multiLocale')) {
                    /** @type {Record<string, any>} */
                    let localeMap = nestedVal;
                    // eslint-disable-next-line no-prototype-builtins
                    if (localeMap.hasOwnProperty(desiredLocale)) {
                        // Transform multiLocaleFirstName to firstName
                        let nonPrefixedKeyPascalCase = prop.replace(/multiLocale/i, '');
                        let nonPrefixedKeyLowerCamelCase = nonPrefixedKeyPascalCase.charAt(0).toLocaleLowerCase() + nonPrefixedKeyPascalCase.substring(1);
                        // Remap nested value to top level
                        liObject[nonPrefixedKeyLowerCamelCase] = localeMap[desiredLocale];
                    }
                } else if (deep) {
                    remapNestedLocale(liObject[prop], desiredLocale, deep);
                }
            }
        });
    }
}


function companyLiPageFromCompanyUrn(companyUrn, db) {
    if (typeof companyUrn === 'string') {
        // Dash
        let company = db.getElementByUrn(companyUrn);
        if (company && company.url) {
            return company.url;
        }

        // profileView
        let linkableCompanyIdMatch = /urn.+Company:(\d+)/.exec(companyUrn);
        if (linkableCompanyIdMatch) {
            return `https://www.linkedin.com/company/${linkableCompanyIdMatch[1]}`;
        }
    }
    return '';
}


function parseAndAttachResumeDates(resumeObj, liEntity) {
    // Time period can either come as `timePeriod` or `dateRange` prop
    let timePeriod = liEntity.timePeriod || liEntity.dateRange;
    if (timePeriod) {
        let start = timePeriod.startDate || timePeriod.start;
        let end = timePeriod.endDate || timePeriod.end;
        if (end) {
            resumeObj.endDate = parseDate(end);
        }
        else {
            resumeObj.endDate = "Present"
        }
        if (start) {
            resumeObj.startDate = parseDate(start);
        }
    }
}










// SCHEMA CODE
var _liSchemaKeys = {
    profile: '*profile',
    certificates: '*certificationView',
    education: '*educationView',
    workPositions: '*positionView',
    workPositionGroups: '*positionGroupView',
    skills: '*skillView',
    projects: '*projectView',
    attachments: '*summaryTreasuryMedias',
    volunteerWork: '*volunteerExperienceView',
    awards: '*honorView',
    publications: '*publicationView'
};

var _liTypeMappings = {
    profile: {
        // There is no tocKey for profile in dash FullProfileWithEntries,
        // due to how entry-point is configured
        tocKeys: ['*profile'],
        types: [
            // regular profileView
            'com.linkedin.voyager.identity.profile.Profile',
            // dash FullProfile
            'com.linkedin.voyager.dash.identity.profile.Profile'
        ],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities']
    },
    certificates: {
        tocKeys: ['*certificationView', '*profileCertifications'],
        types: ['com.linkedin.voyager.dash.identity.profile.Certification'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileCertification']
    },
    education: {
        tocKeys: ['*educationView', '*profileEducations'],
        types: [
            'com.linkedin.voyager.identity.profile.Education',
            // Dash
            'com.linkedin.voyager.dash.identity.profile.Education'
        ],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileEducation']
    },
    courses: {
        tocKeys: ['*courseView', '*profileCourses'],
        types: ['com.linkedin.voyager.identity.profile.Course', 'com.linkedin.voyager.dash.identity.profile.Course'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileCourse']
    },
    // Individual work entries (not aggregate (workgroup) with date range)
    workPositions: {
        tocKeys: ['*positionView'],
        types: ['com.linkedin.voyager.identity.profile.Position', 'com.linkedin.voyager.dash.identity.profile.Position'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfilePosition']
    },
    // Work entry *groups*, aggregated by employer clumping
    workPositionGroups: {
        tocKeys: ['*positionGroupView', '*profilePositionGroups'],
        types: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroupsInjection'],
        recipes: [
            'com.linkedin.voyager.identity.profile.PositionGroupView',
            'com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroup',
            // Generic collection response
            'com.linkedin.restli.common.CollectionResponse'
        ]
    },
    skills: {
        tocKeys: ['*skillView', '*profileSkills'],
        types: ['com.linkedin.voyager.identity.profile.Skill', 'com.linkedin.voyager.dash.identity.profile.Skill'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileSkill']
    },
    projects: {
        tocKeys: ['*projectView', '*profileProjects'],
        types: ['com.linkedin.voyager.identity.profile.Project', 'com.linkedin.voyager.dash.identity.profile.Project'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileProject']
    },
    attachments: {
        tocKeys: ['*summaryTreasuryMedias', '*profileTreasuryMediaPosition'],
        types: ['com.linkedin.voyager.identity.profile.Certification', 'com.linkedin.voyager.dash.identity.profile.treasury.TreasuryMedia'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileTreasuryMedia']
    },
    volunteerWork: {
        tocKeys: ['*volunteerExperienceView', '*profileVolunteerExperiences'],
        types: ['com.linkedin.voyager.dash.identity.profile.VolunteerExperience'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileVolunteerExperience']
    },
    awards: {
        tocKeys: ['*honorView', '*profileHonors'],
        types: ['com.linkedin.voyager.identity.profile.Honor', 'com.linkedin.voyager.dash.identity.profile.Honor'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfileHonor']
    },
    publications: {
        tocKeys: ['*publicationView', '*profilePublications'],
        types: ['com.linkedin.voyager.identity.profile.Publication', 'com.linkedin.voyager.dash.identity.profile.Publication'],
        recipes: ['com.linkedin.voyager.dash.deco.identity.profile.FullProfilePublication']
    }
};












// TEMPLATES CODE


var resumeJsonTemplateStable = {
    basics: {
        name: '',
        profileurn: '',
        entityurn: '',
        publicIdentifier: '',
        label: '',
        picture: '',
        email: '',
        phone: '',
        website: '',
        summary: '',
        location: {
            address: '',
            postalCode: '',
            city: '',
            countryCode: '',
            region: ''
        },
        profiles: []
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    publications: [],
    skills: [],
    languages: [],
    references: []
};

/** @type {Required<ResumeSchemaLatest>} */
var resumeJsonTemplateLatest = {
    $schema: 'https://json.schemastore.org/resume',
    basics: {
        name: '',
        label: '',
        image: '',
        email: '',
        phone: '',
        url: '',
        summary: '',
        location: {
            address: '',
            postalCode: '',
            city: '',
            countryCode: '',
            region: ''
        },
        profiles: []
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    publications: [],
    skills: [],
    languages: [],
    interests: [],
    references: [],
    projects: [],
    meta: {
        version: 'v0.1.3',
        canonical: 'https://github.com/jsonresume/resume-schema/blob/v0.1.3/schema.json'
    }
};

var resumeJsonTemplateBetaPartial = {
    certificates: []
};


// @ts-ignore
window.LinkedinToResumeJson = (() => {
    // private

    let _outputJsonStable = JSON.parse(JSON.stringify(resumeJsonTemplateStable));
    let _outputJsonLatest = JSON.parse(JSON.stringify(resumeJsonTemplateLatest));
    let _outputJsonBetaPartial = JSON.parse(JSON.stringify(resumeJsonTemplateBetaPartial));
    let _supportedLocales = [];
    let _defaultLocale = `en_US`;
    let _voyagerBase = 'https://www.linkedin.com/voyager/api';
    let _voyagerEndpoints = {
        following: '/identity/profiles/{profileId}/following',
        followingCompanies: '/identity/profiles/{profileId}/following?count=10&entityType=COMPANY&q=followedEntities',
        contactInfo: '/identity/profiles/{profileId}/profileContactInfo',
        basicAboutMe: '/me',
        advancedAboutMe: '/identity/profiles/{profileId}',
        fullProfileView: '/identity/profiles/{profileId}/profileView',
        fullSkills: '/identity/profiles/{profileId}/skillCategory',
        recommendations: '/identity/profiles/{profileId}/recommendations',
        dash: {
            profilePositionGroups:
                '/identity/dash/profilePositionGroups?q=viewee&profileUrn=urn:li:fsd_profile:{profileUrnId}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroup-21',
            fullProfile: '/identity/dash/profiles?q=memberIdentity&memberIdentity={profileId}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-53'
        }
    };
    let _scrolledToLoad = false;
    let _toolPrefix = 'jtzLiToResumeJson';
    let _stylesInjected = false;


    function buildDbFromLiSchema(schemaJson) {
        let template = {
            entitiesByUrn: {},
            entities: []
        };
        let db = template;
        db.tableOfContents = schemaJson.data;
        for (let x = 0; x < schemaJson.included.length; x++) {
            let currRow = {
                key: schemaJson.included[x].entityUrn,
                ...schemaJson.included[x]
            };
            db.entitiesByUrn[currRow.entityUrn] = currRow;
            db.entities.push(currRow);
        }
        delete db.tableOfContents['included'];
        db.getElementKeys = function getElementKeys() {
            /** @type {string[]} */
            let searchKeys = ['*elements', 'elements'];
            for (let x = 0; x < searchKeys.length; x++) {
                let key = searchKeys[x];
                let matchingArr = db.tableOfContents[key];
                if (Array.isArray(matchingArr)) {
                    return matchingArr;
                }
            }
            return [];
        };
        // Same as above (getElementKeys), but returns elements themselves
        db.getElements = function getElements() {
            return db.getElementKeys().map((key) => {
                return db.entitiesByUrn[key];
            });
        };

        db.getElementsByType = function getElementByType(typeStr) {
            let typeStrArr = Array.isArray(typeStr) ? typeStr : [typeStr];
            return db.entities.filter((entity) => typeStrArr.indexOf(entity['$type']) !== -1);
        };
        db.getElementByUrn = function getElementByUrn(urn) {
            return db.entitiesByUrn[urn];
        };
        db.getElementsByUrns = function getElementsByUrns(urns) {
            if (typeof urns === 'string') {
                urns = [urns];
            }
            return Array.isArray(urns) ? urns.map((urn) => db.entitiesByUrn[urn]) : [];
        };
        // Only meant for 1:1 lookups; will return first match, if more than one
        // key provided. Usually returns a "view" (kind of a collection)
        db.getValueByKey = function getValueByKey(key) {
            let keyArr = Array.isArray(key) ? key : [key];
            for (let x = 0; x < keyArr.length; x++) {
                let foundVal = db.entitiesByUrn[db.tableOfContents[keyArr[x]]];
                if (foundVal) {
                    return foundVal;
                }
            }
            return undefined;
        };
        db.getValuesByKey = function getValuesByKey(key, optTocValModifier) {
            let values = [];
            if (Array.isArray(key)) {
                return [].concat(
                    ...key.map((k) => {
                        return this.getValuesByKey(k, optTocValModifier);
                    })
                );
            }
            let tocVal = this.tableOfContents[key];
            if (typeof optTocValModifier === 'function') {
                tocVal = optTocValModifier(tocVal);
            }
            // tocVal will usually be a single string that is a key to another lookup. In rare cases, it is an array of direct keys
            let matchingDbIndexs = [];
            // Array of direct keys to sub items
            if (Array.isArray(tocVal)) {
                matchingDbIndexs = tocVal;
            }
            // String pointing to sub item
            else if (tocVal) {
                let subToc = this.entitiesByUrn[tocVal];
                // Needs secondary lookup if has elements property with list of keys pointing to other sub items
                if (subToc['*elements'] && Array.isArray(subToc['*elements'])) {
                    matchingDbIndexs = subToc['*elements'];
                }
                // Sometimes they use 'elements' instead of '*elements"...
                else if (subToc['elements'] && Array.isArray(subToc['elements'])) {
                    matchingDbIndexs = subToc['elements'];
                } else {
                    // The object itself should be the return row
                    values.push(subToc);
                }
            }
            for (let x = 0; x < matchingDbIndexs.length; x++) {
                if (typeof this.entitiesByUrn[matchingDbIndexs[x]] !== 'undefined') {
                    values.push(this.entitiesByUrn[matchingDbIndexs[x]]);
                }
            }
            return values;
        };
        // @ts-ignore
        return db;
    }


    function getProfileIdFromLiSchema(jsonSchema) {
        let profileId = '';
        // miniprofile is not usually in the TOC, nor does its entry have an entityUrn for looking up (it has objectUrn), so best solution is just to iterate through all entries checking for match.
        if (jsonSchema.included && Array.isArray(jsonSchema.included)) {
            for (let x = 0; x < jsonSchema.included.length; x++) {
                let currEntity = jsonSchema.included[x];
                // Test for miniProfile match
                if (typeof currEntity['publicIdentifier'] === 'string') {
                    profileId = currEntity.publicIdentifier;
                }
            }
        }
        return profileId.toString();
    }

    function pushSkill(skillName) {
        // Try to prevent duplicate skills
        // Both stable and latest use same spec
        let skillNames = _outputJsonStable.skills.map((skill) => skill.name);
        if (skillNames.indexOf(skillName) === -1) {
            /** @type {ResumeSchemaStable['skills'][0]} */
            let formattedSkill = {
                name: skillName,
                level: '',
                keywords: []
            };
            _outputJsonStable.skills.push(formattedSkill);
            _outputJsonLatest.skills.push(formattedSkill);
        }
    }

    function parseAndPushEducation(educationObj, db, instance) {
        let _this = instance;
        let edu = educationObj;
        let parsedEdu = {
            institution: noNullOrUndef(edu.schoolName),
            area: noNullOrUndef(edu.fieldOfStudy),
            studyType: noNullOrUndef(edu.degreeName),
            startDate: '',
            endDate: '',
            gpa: noNullOrUndef(edu.grade),
            courses: []
        };
        parseAndAttachResumeDates(parsedEdu, edu);
        if (Array.isArray(edu.courses)) {
            // Lookup course names
            edu.courses.forEach((courseKey) => {
                let courseInfo = db.entitiesByUrn[courseKey];
                if (courseInfo) {
                    parsedEdu.courses.push(`${courseInfo.number} - ${courseInfo.name}`);
                } else {
                    _this.debugConsole.warn('could not find course:', courseKey);
                }
            });
        } else {
            // new version (Dash) of education <--> course relationship
            // linked on "union" field, instead of directly, so have to iterate
            db.getElementsByType(_liTypeMappings.courses.types).forEach((c) => {
                if (c.occupationUnion && c.occupationUnion.profileEducation) {
                    if (c.occupationUnion.profileEducation === edu.entityUrn) {
                        // union joined!
                        parsedEdu.courses.push(`${c.number} - ${c.name}`);
                    }
                }
            });
        }
        // Push to final json
        _outputJsonStable.education.push(parsedEdu);
        // Currently, same schema can be re-used; only difference is URL, which I'm not including
        _outputJsonLatest.education.push(parsedEdu);
    }

    function parseAndPushPosition(positionObj, db) {
        let parsedWork = {
            company: positionObj.companyName,
            endDate: '',
            highlights: [],
            position: positionObj.title,
            startDate: '',
            summary: positionObj.description,
            website: companyLiPageFromCompanyUrn(positionObj['companyUrn'], db)
        };
        parseAndAttachResumeDates(parsedWork, positionObj);
        // Lookup company website
        if (positionObj.company && positionObj.company['*miniCompany']) {
            // @TODO - website is not in schema. Use voyager?
            // let companyInfo = db.data[position.company['*miniCompany']];
        }
        if (parsedWork.endDate == "")
            parsedWork.endDate = "Present";
        // Push to final json
        _outputJsonStable.work.push(parsedWork);
        _outputJsonLatest.work.push({
            name: parsedWork.company,
            position: parsedWork.position,
            // This is description of company, not position
            // description: '',
            startDate: parsedWork.startDate,
            endDate: parsedWork.endDate,
            highlights: parsedWork.highlights,
            summary: parsedWork.summary,
            url: parsedWork.website
        });
    }


    async function parseProfileSchemaJSON(instance, liResponse, endpoint = 'profileView') {
        let _this = instance;
        let dash = endpoint === 'dashFullProfileWithEntities';
        let foundGithub = false;
        let foundPortfolio = false;
        let resultSummary = {
            liResponse,
            profileSrc: endpoint,
            pageUrl: null,
            parseSuccess: false,
            sections: {
                basics: 'fail',
                attachments: 'fail',
                education: 'fail',
                work: 'fail',
                volunteer: 'fail',
                certificates: 'fail',
                skills: 'fail',
                projects: 'fail',
                awards: 'fail',
                publications: 'fail'
            }
        };
        if (_this.preferLocale) {
            resultSummary.localeStr = _this.preferLocale;
        }
        try {
            // Build db object
            let db = buildDbFromLiSchema(liResponse);

            if (dash && !liResponse.data.hoisted) {
                // For FullProfileWithEntities, the main entry point of response
                // (response.data) points directly to the profile object, by URN
                // This profile obj itself holds the ToC to its content, instead
                // of having the ToC in the res.data section (like profileView)
                let profileObj = db.getElementByUrn(db.tableOfContents['*elements'][0]);
                if (!profileObj || !profileObj.firstName) {
                    throw new Error('Could not extract nested profile object from Dash endpoint');
                }
                // To make this easier to work with lookup, we'll unpack the
                // profile view nested object BACK into the root (ToC), so
                // that subsequent lookups can be performed by key instead of type | recipe
                // This is critical for lookups that require precise ordering, preserved by ToCs
                /** @type {LiResponse} */
                let hoistedRes = {
                    data: {
                        ...liResponse.data,
                        ...profileObj,
                        // Set flag for future
                        hoisted: true
                    },
                    included: liResponse.included
                };
                resultSummary.liResponse = hoistedRes;
                db = buildDbFromLiSchema(hoistedRes);
            }

            // Parse basics / profile
            let profileGrabbed = false;
            let profileObjs = dash ? [db.getElementByUrn(db.tableOfContents['*elements'][0])] : db.getValuesByKey(_liSchemaKeys.profile);
            instance.debugConsole.log({ profileObjs });
            profileObjs.forEach((profile) => {
                //  console.log(profile)
                entityurn = profile.entityUrn;
                // There should only be one
                if (!profileGrabbed) {
                    profileGrabbed = true;
                    resultSummary.profileInfoObj = profile;
                    let localeObject = !dash ? profile.defaultLocale : profile.primaryLocale;
                    let formattedProfileObj = {
                        name: `${profile.firstName} ${profile.lastName}`,
                        summary: noNullOrUndef(profile.summary),
                        label: noNullOrUndef(profile.headline),
                        location: {
                            countryCode: localeObject.country
                        }
                    };
                    if (profile.address) {
                        formattedProfileObj.location.address = noNullOrUndef(profile.address);
                    } else if (profile.locationName) {
                        formattedProfileObj.location.address = noNullOrUndef(profile.locationName);
                    }
                    _outputJsonStable.basics = {
                        ..._outputJsonStable.basics,
                        ...formattedProfileObj
                    };
                    _outputJsonLatest.basics = {
                        ..._outputJsonLatest.basics,
                        ...formattedProfileObj
                    };
                    let formatttedLang = {
                        language: localeObject.language,
                        fluency: 'Native Speaker'
                    };
                    _outputJsonStable.languages.push(formatttedLang);
                    _outputJsonLatest.languages.push(formatttedLang);
                    resultSummary.sections.basics = 'success';

                    // Also make sure instance defaultLocale is correct, while we are parsing profile
                    let parsedLocaleStr = `${localeObject.language}_${localeObject.country}`;
                    _defaultLocale = parsedLocaleStr;
                    resultSummary.localeStr = parsedLocaleStr;
                }
            });

            // Parse attachments / portfolio links
            let attachments = db.getValuesByKey(_liTypeMappings.attachments.tocKeys);
            attachments.forEach((attachment) => {
                let captured = false;
                let url = attachment.data.url || attachment.data.Url;
                // console.log(url)
                if (attachment.providerName === 'GitHub' || /github\.com/gim.test(url)) {
                    let usernameMatch = /github\.com\/([^\/\?]+)[^\/]+$/gim.exec(url);
                    if (usernameMatch && !foundGithub) {
                        foundGithub = true;
                        captured = true;
                        let formattedProfile = {
                            network: 'GitHub',
                            username: usernameMatch[1],
                            url
                        };
                        _outputJsonStable.basics.profiles.push(formattedProfile);
                        _outputJsonLatest.basics.profiles.push(formattedProfile);
                    }
                }
                // Since most people put potfolio as first link, guess that it will be
                if (!captured && !foundPortfolio) {
                    captured = true;
                    _outputJsonStable.basics.website = url;
                    _outputJsonLatest.basics.url = url;
                }
                // Finally, put in projects if not yet categorized
                if (!captured) {
                    captured = true;
                    _outputJsonLatest.projects = _outputJsonLatest.projects || [];
                    _outputJsonLatest.projects.push({
                        name: attachment.title || attachment.mediaTitle,
                        startDate: '',
                        endDate: '',
                        description: attachment.description || attachment.mediaDescription,
                        url
                    });
                }
            });
            resultSummary.sections.attachments = attachments.length ? 'success' : 'empty';

            // Parse education
            let allEducationCanBeCaptured = true;
            // educationView contains both paging data, and list of child elements
            let educationView = db.getValueByKey(_liTypeMappings.education.tocKeys);
            if (educationView.paging) {
                let { paging } = educationView;
                allEducationCanBeCaptured = paging.start + paging.count >= paging.total;
            }
            if (allEducationCanBeCaptured) {
                let educationEntries = db.getValuesByKey(_liTypeMappings.education.tocKeys);
                educationEntries.forEach((edu) => {
                    parseAndPushEducation(edu, db, _this);
                });
                _this.debugConsole.log(`All education positions captured directly from profile result.`);
                resultSummary.sections.education = 'success';
            } else {
                _this.debugConsole.warn(`Education positions in profile are truncated.`);
                resultSummary.sections.education = 'incomplete';
            }

            // Parse work
            // First, check paging data
            let allWorkCanBeCaptured = true;
            let positionView = db.getValueByKey([..._liTypeMappings.workPositionGroups.tocKeys, ..._liTypeMappings.workPositions.tocKeys]);
            if (positionView.paging) {
                let { paging } = positionView;
                allWorkCanBeCaptured = paging.start + paging.count >= paging.total;
            }
            if (allWorkCanBeCaptured) {
                _this.getWorkPositions(db).forEach((position) => {
                    parseAndPushPosition(position, db);
                });
                _this.debugConsole.log(`All work positions captured directly from profile result.`);
                resultSummary.sections.work = 'success';
            } else {
                _this.debugConsole.warn(`Work positions in profile are truncated.`);
                resultSummary.sections.work = 'incomplete';
            }

            // Parse volunteer experience
            let volunteerEntries = db.getValuesByKey(_liTypeMappings.volunteerWork.tocKeys);
            volunteerEntries.forEach((volunteering) => {
                // console.log("VOLUTERRING PRINTING");
                // console.log(volunteering);
                // alert('hi1')
                /** @type {ResumeSchemaStable['volunteer'][0]} */
                let parsedVolunteerWork = {
                    organization: volunteering.companyName,
                    position: volunteering.role,
                    website: companyLiPageFromCompanyUrn(volunteering['companyUrn'], db),
                    startDate: '',
                    endDate: '',
                    summary: volunteering.description,
                    highlights: []
                };
                parseAndAttachResumeDates(parsedVolunteerWork, volunteering);

                // Push to final json
                _outputJsonStable.volunteer.push(parsedVolunteerWork);
                _outputJsonLatest.volunteer.push({
                    ...lazyCopy(parsedVolunteerWork, ['website']),
                    url: parsedVolunteerWork.website
                });
            });
            resultSummary.sections.volunteer = volunteerEntries.length ? 'success' : 'empty';

            /**
             * Parse certificates
             *  - NOTE: This is not currently supported by the official (stable / latest) JSON Resume spec,
             *  - Restricted to 'beta' template
             * @see https://github.com/jsonresume/resume-schema/pull/340
             */
            /** @type {ResumeSchemaBeyondSpec['certificates']} */
            let certificates = [];
            db.getValuesByKey(_liTypeMappings.certificates.tocKeys).forEach((cert) => {
                /** @type {ResumeSchemaBeyondSpec['certificates'][0]} */
                let certObj = {
                    title: cert.name,
                    issuer: cert.authority
                };
                parseAndAttachResumeDates(certObj, cert);
                if (typeof cert.url === 'string' && cert.url) {
                    certObj.url = cert.url;
                }
                certificates.push(certObj);
            });
            resultSummary.sections.certificates = certificates.length ? 'success' : 'empty';
            _outputJsonBetaPartial.certificates = certificates;

            // Parse skills
            /** @type {string[]} */
            let skillArr = [];
            db.getValuesByKey(_liTypeMappings.skills.tocKeys).forEach((skill) => {
                skillArr.push(skill.name);
            });
            document.querySelectorAll('span[class*="skill-category-entity"][class*="name"]').forEach((skillNameElem) => {
                // @ts-ignore
                let skillName = skillNameElem.innerText;
                if (!skillArr.includes(skillName)) {
                    skillArr.push(skillName);
                }
            });
            skillArr.forEach((skillName) => {
                pushSkill(skillName);
            });
            resultSummary.sections.skills = skillArr.length ? 'success' : 'empty';

            // Parse projects
            _outputJsonLatest.projects = _outputJsonLatest.projects || [];
            db.getValuesByKey(_liTypeMappings.projects.tocKeys).forEach((project) => {
                let parsedProject = {
                    name: project.title,
                    startDate: '',
                    summary: project.description,
                    url: project.url
                };
                parseAndAttachResumeDates(parsedProject, project);
                _outputJsonLatest.projects.push(parsedProject);
            });
            resultSummary.sections.projects = _outputJsonLatest.projects.length ? 'success' : 'empty';

            // Parse awards
            let awardEntries = db.getValuesByKey(_liTypeMappings.awards.tocKeys);
            awardEntries.forEach((award) => {
                /** @type {ResumeSchemaStable['awards'][0]} */
                let parsedAward = {
                    title: award.title,
                    date: '',
                    awarder: award.issuer,
                    summary: noNullOrUndef(award.description)
                };
                // profileView vs dash key
                let issueDateObject = award.issueDate || award.issuedOn;
                if (issueDateObject && typeof issueDateObject === 'object') {
                    parsedAward.date = parseDate(issueDateObject);
                }
                _outputJsonStable.awards.push(parsedAward);
                _outputJsonLatest.awards.push(parsedAward);
            });
            resultSummary.sections.awards = awardEntries.length ? 'success' : 'empty';

            // Parse publications
            let publicationEntries = db.getValuesByKey(_liTypeMappings.publications.tocKeys);
            publicationEntries.forEach((publication) => {
                /** @type {ResumeSchemaStable['publications'][0]} */
                let parsedPublication = {
                    name: publication.name,
                    publisher: publication.publisher,
                    releaseDate: '',
                    website: noNullOrUndef(publication.url),
                    summary: noNullOrUndef(publication.description)
                };
                // profileView vs dash key
                let publicationDateObj = publication.date || publication.publishedOn;
                if (publicationDateObj && typeof publicationDateObj === 'object' && typeof publicationDateObj.year !== 'undefined') {
                    parsedPublication.releaseDate = parseDate(publicationDateObj);
                }
                _outputJsonStable.publications.push(parsedPublication);
                _outputJsonLatest.publications.push({
                    ...lazyCopy(parsedPublication, ['website']),
                    url: parsedPublication.website
                });
            });
            resultSummary.sections.publications = publicationEntries.length ? 'success' : 'empty';

            if (_this.debug) {
                console.group(`parseProfileSchemaJSON complete: ${document.location.pathname}`);
                // console.log({
                //     db,
                //     _outputJsonStable,
                //     _outputJsonLatest,
                //     resultSummary
                // });
                console.groupEnd();
            }

            _this.parseSuccess = true;
            resultSummary.parseSuccess = true;
            resultSummary.pageUrl = _this.getUrlWithoutQuery();
        } catch (e) {
            if (_this.debug) {
                console.group('Error parsing profile schema');
                // console.log(e);
                // console.log('Instance');
                // console.log(_this);
                console.groupEnd();
            }
            resultSummary.parseSuccess = false;
        }
        return resultSummary;
    }

    /**
     * letructor
     * @param {boolean} [OPT_debug] - Debug Mode?
     * @param {boolean} [OPT_preferApi] - Prefer Voyager API, rather than DOM scrape?
     * @param {boolean} [OPT_getFullSkills] - Retrieve full skills (behind additional API endpoint), rather than just basics
     */
    function LinkedinToResumeJson(OPT_debug, OPT_preferApi, OPT_getFullSkills) {
        let _this = this;
        this.profileId = this.getProfileId();
        /** @type {string | null} */
        this.profileUrnId = null;
        /** @type {ParseProfileSchemaResultSummary} */
        this.profileParseSummary = null;
        /** @type {string | null} */
        this.lastScannedLocale = null;
        /** @type {string | null} */
        this.preferLocale = null;
        _defaultLocale = this.getViewersLocalLang();
        this.scannedPageUrl = '';
        this.parseSuccess = false;
        this.getFullSkills = typeof OPT_getFullSkills === 'boolean' ? OPT_getFullSkills : true;
        this.preferApi = typeof OPT_preferApi === 'boolean' ? OPT_preferApi : true;
        this.debug = typeof OPT_debug === 'boolean' ? OPT_debug : false;
        // Force use of newer Dash endpoints when possible, for debuggin
        this.preferDash = this.debug && /forceDashEndpoint=true/i.test(document.location.href);
        if (this.debug) {
            console.warn('LinkedinToResumeJson - DEBUG mode is ON');
            this.internals = {
                buildDbFromLiSchema,
                parseProfileSchemaJSON,
                _defaultLocale,
                _liSchemaKeys,
                _liTypeMappings,
                _voyagerEndpoints,
                output: {
                    _outputJsonStable,
                    _outputJsonLatest,
                    _outputJsonBetaPartial
                }
            };
        }
        this.debugConsole = {
            /** @type {(...args: any[]) => void} */
            log: (...args) => {
                if (_this.debug) {
                    console.log.apply(null, args);
                }
            },
            /** @type {(...args: any[]) => void} */
            warn: (...args) => {
                if (_this.debug) {
                    console.warn.apply(null, args);
                }
            },
            /** @type {(...args: any[]) => void} */
            error: (...args) => {
                if (_this.debug) {
                    console.error.apply(null, args);
                }
            }
        };
    }

    // Regular Methods

    LinkedinToResumeJson.prototype.parseEmbeddedLiSchema = async function parseEmbeddedLiSchema() {
        let _this = this;
        let doneWithBlockIterator = false;
        let foundSomeSchema = false;
        let possibleBlocks = document.querySelectorAll('code[id^="bpr-guid-"]');
        for (let x = 0; x < possibleBlocks.length; x++) {
            let currSchemaBlock = possibleBlocks[x];
            // Check if current schema block matches profileView
            if (/educationView/.test(currSchemaBlock.innerHTML) && /positionView/.test(currSchemaBlock.innerHTML)) {
                try {
                    let embeddedJson = JSON.parse(currSchemaBlock.innerHTML);
                    // Due to SPA nature, tag could actually be for profile other than the one currently open
                    let desiredProfileId = _this.getProfileId();
                    let schemaProfileId = getProfileIdFromLiSchema(embeddedJson);
                    if (schemaProfileId === desiredProfileId) {
                        doneWithBlockIterator = true;
                        foundSomeSchema = true;
                        // eslint-disable-next-line no-await-in-loop
                        let profileParserResult = await parseProfileSchemaJSON(_this, embeddedJson);
                        _this.debugConsole.log(`Parse from embedded schema, success = ${profileParserResult.parseSuccess}`);
                        if (profileParserResult.parseSuccess) {
                            this.profileParseSummary = profileParserResult;
                        }
                    } else {
                        _this.debugConsole.log(`Valid schema found, but schema profile id of "${schemaProfileId}" does not match desired profile ID of "${desiredProfileId}".`);
                    }
                } catch (e) {
                    if (_this.debug) {
                        throw e;
                    }
                    _this.debugConsole.warn('Could not parse embedded schema!', e);
                }
            }
            if (doneWithBlockIterator) {
                _this.parseSuccess = true;
                break;
            }
        }
        if (!foundSomeSchema) {
            _this.debugConsole.warn('Failed to find any embedded schema blocks!');
        }
    };

    // This should be called every time
    LinkedinToResumeJson.prototype.parseBasics = function parseBasics() {
        this.profileId = this.getProfileId();
        let formattedProfile = {
            network: 'LinkedIn',
            username: this.profileId,
            url: `https://www.linkedin.com/in/${this.profileId}/`
        };
        _outputJsonStable.basics.profiles.push(formattedProfile);
        _outputJsonLatest.basics.profiles.push(formattedProfile);
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiFullProfile = async function parseViaInternalApiFullProfile(useCache = true) {
        try {
            // Get full profile
            let profileParserResult = await this.getParsedProfile(useCache);


            // Some sections might require additional fetches to fill missing data
            if (profileParserResult.sections.work === 'incomplete') {
                _outputJsonStable.work = [];
                _outputJsonLatest.work = [];
                await this.parseViaInternalApiWork();
            }
            if (profileParserResult.sections.education === 'incomplete') {
                _outputJsonStable.education = [];
                _outputJsonLatest.education = [];
                await this.parseViaInternalApiEducation();
            }

            this.debugConsole.log({
                _outputJsonStable,
                _outputJsonLatest
            });

            return true;
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - FullProfile', e);
        }
        return false;
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiFullSkills = async function parseViaInternalApiFullSkills() {
        try {
            let fullSkillsInfo = await this.voyagerFetch(_voyagerEndpoints.fullSkills);
            if (fullSkillsInfo && typeof fullSkillsInfo.data === 'object') {
                if (Array.isArray(fullSkillsInfo.included)) {
                    for (let x = 0; x < fullSkillsInfo.included.length; x++) {
                        let skillObj = fullSkillsInfo.included[x];
                        if (typeof skillObj.name === 'string') {
                            pushSkill(skillObj.name);
                        }
                    }
                    prateekfun(fullSkillsInfo)

                }
                return true;
            }
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - FullSkills', e);
        }
        return false;
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiContactInfo = async function parseViaInternalApiContactInfo() {
        try {
            let contactInfo = await this.voyagerFetch(_voyagerEndpoints.contactInfo);
            //  console.log(contactInfo)
            if (contactInfo && typeof contactInfo.data === 'object') {
                let { websites, twitterHandles, phoneNumbers, emailAddress } = contactInfo.data;
                /** @type {Partial<ResumeSchemaStable['basics']>} */
                let partialBasics = {
                    location: _outputJsonStable.basics.location
                };
                partialBasics.location.address = noNullOrUndef(contactInfo.data.address, _outputJsonStable.basics.location.address);
                partialBasics.email = noNullOrUndef(emailAddress, _outputJsonStable.basics.email);
                if (phoneNumbers && phoneNumbers.length) {
                    partialBasics.phone = noNullOrUndef(phoneNumbers[0].number);
                }
                _outputJsonStable.basics = {
                    ..._outputJsonStable.basics,
                    ...partialBasics
                };
                _outputJsonLatest.basics = {
                    ..._outputJsonLatest.basics,
                    ...partialBasics
                };


                // Scrape Twitter
                if (Array.isArray(twitterHandles)) {
                    twitterHandles.forEach((handleMeta) => {
                        let handle = handleMeta.name;
                        let formattedProfile = {
                            network: 'Twitter',
                            username: handle,
                            url: `https://twitter.com/${handle}`
                        };
                        _outputJsonStable.basics.profiles.push(formattedProfile);
                        _outputJsonLatest.basics.profiles.push(formattedProfile);
                    });
                }

                return true;
            }
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - Contact Info', e);
        }
        return false;
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiBasicAboutMe = async function parseViaInternalApiBasicAboutMe() {
        try {
            let basicAboutMe = await this.voyagerFetch(_voyagerEndpoints.basicAboutMe);
            if (basicAboutMe && typeof basicAboutMe.data === 'object') {
                if (Array.isArray(basicAboutMe.included) && basicAboutMe.included.length > 0) {
                    let data = basicAboutMe.included[0];
                    /** @type {Partial<ResumeSchemaStable['basics']>} */
                    let partialBasics = {
                        name: `${data.firstName} ${data.LastName}`,
                        // Note - LI labels this as "occupation", but it is basically the callout that shows up in search results and is in the header of the profile
                        label: data.occupation
                    };
                    _outputJsonStable.basics = {
                        ..._outputJsonStable.basics,
                        ...partialBasics
                    };
                    _outputJsonLatest.basics = {
                        ..._outputJsonLatest.basics,
                        ...partialBasics
                    };
                }
                return true;
            }
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - Basic About Me', e);
        }
        return false;
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiAdvancedAboutMe = async function parseViaInternalApiAdvancedAboutMe() {
        try {
            let advancedAboutMe = await this.voyagerFetch(_voyagerEndpoints.advancedAboutMe);
            if (advancedAboutMe && typeof advancedAboutMe.data === 'object') {
                let { data } = advancedAboutMe;
                /** @type {Partial<ResumeSchemaStable['basics']>} */
                let partialBasics = {
                    name: `${data.firstName} ${data.lastName}`,
                    label: data.headline,
                    summary: data.summary
                };
                _outputJsonStable.basics = {
                    ..._outputJsonStable.basics,
                    ...partialBasics
                };
                _outputJsonLatest.basics = {
                    ..._outputJsonLatest.basics,
                    ...partialBasics
                };
                return true;
            }
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - AdvancedAboutMe', e);
        }
        return false;
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiRecommendations = async function parseViaInternalApiRecommendations() {
        try {
            let recommendationJson = await this.voyagerFetch(`${_voyagerEndpoints.recommendations}?q=received&recommendationStatuses=List(VISIBLE)`);
            // This endpoint return a LI db
            let db = buildDbFromLiSchema(recommendationJson);
            db.getElementKeys().forEach((key) => {
                let elem = db.entitiesByUrn[key];
                if (elem && 'recommendationText' in elem) {
                    // Need to do a secondary lookup to get the name of the person who gave the recommendation
                    let recommenderElem = db.entitiesByUrn[elem['*recommender']];
                    let formattedReference = {
                        name: `${recommenderElem.firstName} ${recommenderElem.lastName}`,
                        reference: elem.recommendationText
                    };
                    _outputJsonStable.references.push(formattedReference);
                    _outputJsonLatest.references.push(formattedReference);
                }
            });
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - Recommendations', e);
        }
        return false;
    };

    /**
     * Extract work positions via traversal through position groups
     *  - LI groups "positions" by "positionGroups" - e.g. if you had three positions at the same company, with no breaks in-between to work at another company, those three positions are grouped under a single positionGroup
     *  - LI also uses positionGroups to preserve order, whereas a direct lookup by type or recipe might not return ordered results
     *  - This method will try to return ordered results first, and then fall back to any matching positition entities if it can't find an ordered lookup path
     * @param {InternalDb} db
     */
    LinkedinToResumeJson.prototype.getWorkPositions = function getWorkPositions(db) {
        let rootElements = db.getElements() || [];
        /** @type {LiEntity[]} */
        let positions = [];

        /**
         * There are multiple ways that work positions can be nested within a profileView, or other data structure
         *  A) **ROOT** -> *profilePositionGroups -> PositionGroup[] -> *profilePositionInPositionGroup (COLLECTION) -> Position[]
         *  B) **ROOT** -> *positionGroupView -> PositionGroupView -> PositionGroup[] -> *positions -> Position[]
         */

        // This is route A - longest recursion chain
        // profilePositionGroup responses are a little annoying; the direct children don't point directly to position entities
        // Instead, you have to follow path of `profilePositionGroup` -> `*profilePositionInPositionGroup` -> `*elements` -> `Position`
        // You can bypass by looking up by `Position` type, but then original ordering is not preserved
        let profilePositionGroups = db.getValuesByKey('*profilePositionGroups');
        // Check for voyager profilePositionGroups response, where all groups are direct children of root element
        if (!profilePositionGroups.length && rootElements.length && rootElements[0].$type === 'com.linkedin.voyager.dash.identity.profile.PositionGroup') {
            profilePositionGroups = rootElements;
        }
        profilePositionGroups.forEach((pGroup) => {
            // This element (profilePositionGroup) is one way how LI groups positions
            // - Instead of storing *elements (positions) directly,
            // there is a pointer to a "collection" that has to be followed
            /** @type {string | string[] | undefined} */
            let profilePositionInGroupCollectionUrns = pGroup['*profilePositionInPositionGroup'];
            if (profilePositionInGroupCollectionUrns) {
                let positionCollections = db.getElementsByUrns(profilePositionInGroupCollectionUrns);
                // Another level... traverse collections
                positionCollections.forEach((collection) => {
                    // Final lookup via standard collection['*elements']
                    positions = positions.concat(db.getElementsByUrns(collection['*elements'] || []));
                });
            }
        });

        if (!positions.length) {
            db.getValuesByKey('*positionGroupView').forEach((pGroup) => {
                positions = positions.concat(db.getElementsByUrns(pGroup['*positions'] || []));
            });
        }

        if (!positions.length) {
            // Direct lookup - by main TOC keys
            positions = db.getValuesByKey(_liTypeMappings.workPositions.tocKeys);
        }

        if (!positions.length) {
            // Direct lookup - by type
            positions = db.getElementsByType(_liTypeMappings.workPositions.types);
        }

        return positions;
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiWork = async function parseViaInternalApiWork() {
        try {
            let workResponses = await this.voyagerFetchAutoPaginate(_voyagerEndpoints.dash.profilePositionGroups);
            workResponses.forEach((response) => {
                let db = buildDbFromLiSchema(response);
                this.getWorkPositions(db).forEach((position) => {
                    parseAndPushPosition(position, db);
                });
            });
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - Work', e);
        }
    };

    LinkedinToResumeJson.prototype.parseViaInternalApiEducation = async function parseViaInternalApiEducation() {
        try {
            // This is a really annoying lookup - I can't find a separate API endpoint, so I have to use the full-FULL (dash) profile endpoint...
            let fullDashProfileObj = await this.voyagerFetch(_voyagerEndpoints.dash.fullProfile);
            let db = buildDbFromLiSchema(fullDashProfileObj);
            // Response is missing ToC, so just look up by namespace / schema
            let eduEntries = db.getElementsByType('com.linkedin.voyager.dash.identity.profile.Education');
            eduEntries.forEach((edu) => {
                parseAndPushEducation(edu, db, this);
            });
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - Education', e);
        }
    };

    LinkedinToResumeJson.prototype.parseViaInternalApi = async function parseViaInternalApi(useCache = true) {
        try {
            let apiSuccessCount = 0;
            let fullProfileEndpointSuccess = false;

            fullProfileEndpointSuccess = await this.parseViaInternalApiFullProfile(useCache);
            if (fullProfileEndpointSuccess) {
                apiSuccessCount++;
            }

            // Get full skills, behind voyager endpoint
            if (this.getFullSkills && (await this.parseViaInternalApiFullSkills())) {
                apiSuccessCount++;
            }

            // Always get full contact info, behind voyager endpoint
            if (await this.parseViaInternalApiContactInfo()) {
                apiSuccessCount++;
            }

            // References / recommendations should also come via voyager; DOM is extremely unreliable for this
            if (await this.parseViaInternalApiRecommendations()) {
                apiSuccessCount++;
            }

            // Only continue with other endpoints if full profile API failed
            if (!fullProfileEndpointSuccess) {
                if (await this.parseViaInternalApiBasicAboutMe()) {
                    apiSuccessCount++;
                }
                if (await this.parseViaInternalApiAdvancedAboutMe()) {
                    apiSuccessCount++;
                }
            }

            this.debugConsole.log({
                _outputJsonStable,
                _outputJsonLatest,
                _outputJsonBetaPartial
            });
            if (apiSuccessCount > 0) {
                this.parseSuccess = true;
            } else {
                this.debugConsole.error('Using internal API (Voyager) failed completely!');
            }
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager)', e);
        }
    };

    /**
     * Trigger AJAX loading of content by scrolling
     * @param {boolean} [forceReScroll]
     */
    LinkedinToResumeJson.prototype.triggerAjaxLoadByScrolling = async function triggerAjaxLoadByScrolling(forceReScroll = false) {
        _scrolledToLoad = forceReScroll ? false : _scrolledToLoad;
        if (!_scrolledToLoad) {
            // Capture current location
            let startingLocY = window.scrollY;
            // Scroll to bottom
            let scrollToBottom = () => {
                let maxHeight = document.body.scrollHeight;
                window.scrollTo(0, maxHeight);
            };
            scrollToBottom();
            await new Promise((resolve) => {
                setTimeout(() => {
                    scrollToBottom();
                    window.scrollTo(0, startingLocY);
                    _scrolledToLoad = true;
                    resolve();
                }, 400);
            });
        }

        return true;
    };

    /**
     * Force a re-parse / scrape
     * @param {string} [optLocale]
     */
    LinkedinToResumeJson.prototype.forceReParse = async function forceReParse(optLocale) {
        _scrolledToLoad = false;
        this.parseSuccess = false;
        await this.tryParse(optLocale);
    };

    /**
     * See if profile has changed (either URL or otherwise) since last scrape
     * @param {string} [optLocale] preferred locale
     * @returns {boolean} hasProfileChanged
     */
    LinkedinToResumeJson.prototype.getHasChangedSinceLastParse = function getHasChangedSinceLastParse(optLocale) {
        let localeToUse = optLocale || this.preferLocale;
        let localeStayedSame = !localeToUse || optLocale === this.lastScannedLocale;
        let pageUrlChanged = this.scannedPageUrl === this.getUrlWithoutQuery();

        return localeStayedSame && pageUrlChanged;
    };

    /**
     * Get the parsed version of the LI profile response object
     *  - Caches profile object and re-uses when possible
     * @param {boolean} [useCache] default = true
     * @param {string} [optLocale] preferred locale. Defaults to instance.preferLocale
     * @returns {Promise<ParseProfileSchemaResultSummary>} profile object response summary
     */
    LinkedinToResumeJson.prototype.getParsedProfile = async function getParsedProfile(useCache = true, optLocale) {
        let localeToUse = optLocale || this.preferLocale;
        let localeMatchesUser = !localeToUse || localeToUse === _defaultLocale;

        if (this.profileParseSummary && useCache) {
            let { pageUrl, localeStr, parseSuccess } = this.profileParseSummary;
            let urlChanged = pageUrl !== this.getUrlWithoutQuery();
            let langChanged = !!localeToUse && localeToUse !== localeStr;
            if (parseSuccess && !urlChanged && !langChanged) {
                this.debugConsole.log('getProfileResponse - Used Cache');
                return this.profileParseSummary;
            }
        }

        // Embedded schema can't be used for specific locales
        if (this.preferApi === false && localeMatchesUser) {
            await this.triggerAjaxLoadByScrolling(true);
            await this.parseEmbeddedLiSchema();
            if (this.parseSuccess) {
                this.debugConsole.log('getProfileResponse - Used embedded schema. Success.');
                return this.profileParseSummary;
            }
        }

        // Get directly via API
        /** @type {ParseProfileSchemaResultSummary['profileSrc']} */
        let endpointType = 'profileView';
        /** @type {LiResponse} */
        let profileResponse;
        /**
         * LI acts strange if user is a multilingual user, with defaultLocale different than the resource being requested. It will *not* respect x-li-lang header for profileView, and you instead have to use the Dash fullprofile endpoint
         */
        if (!localeMatchesUser || this.preferDash === true) {
            endpointType = 'dashFullProfileWithEntities';
            profileResponse = await this.voyagerFetch(_voyagerEndpoints.dash.fullProfile);
        } else {
            // use normal profileView
            profileResponse = await this.voyagerFetch(_voyagerEndpoints.fullProfileView);
        }

        // Try to use the same parser that I use for embedded
        let profileParserResult = await parseProfileSchemaJSON(this, profileResponse, endpointType);

        if (profileParserResult.parseSuccess) {
            this.debugConsole.log('getProfileResponse - Used API. Sucess', {
                profileResponse,
                endpointType,
                profileParserResult
            });
            this.profileParseSummary = profileParserResult;
            return this.profileParseSummary;
        }

        throw new Error('Could not get profile response object');
    };

    /**
     * Try to scrape / get API and parse
     *  - Has some basic cache checking to avoid redundant parsing
     * @param {string} [optLocale]
     */
    LinkedinToResumeJson.prototype.tryParse = async function tryParse(optLocale) {
        let _this = this;
        let localeToUse = optLocale || _this.preferLocale;
        let localeStayedSame = !localeToUse || localeToUse === _this.lastScannedLocale;
        let localeMatchesUser = !localeToUse || localeToUse === _this.getViewersLocalLang();
        _this.preferLocale = localeToUse || null;

        // console.log()

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            if (_this.parseSuccess) {
                if (_this.scannedPageUrl === _this.getUrlWithoutQuery() && localeStayedSame) {
                    // No need to reparse!
                    _this.debugConsole.log('Skipped re-parse; page has not changed');
                    resolve(true);
                } else {
                    // Parse already done, but page changed (ajax)
                    _this.debugConsole.warn('Re-parsing for new results; page has changed between scans');
                    await _this.forceReParse(localeToUse);
                    resolve(true);
                }
            } else {
                // Reset output to empty template
                _outputJsonStable = JSON.parse(JSON.stringify(resumeJsonTemplateStable));
                //  console.log(_outputJsonStable)
                // console.log(resumeJsonTemplateStable)
                _outputJsonLatest = JSON.parse(JSON.stringify(resumeJsonTemplateLatest));
                _outputJsonBetaPartial = JSON.parse(JSON.stringify(resumeJsonTemplateBetaPartial));

                // Trigger full load
                await _this.triggerAjaxLoadByScrolling();
                _this.parseBasics();

                // Embedded schema can't be used for specific locales
                if (_this.preferApi === false && localeMatchesUser) {
                    await _this.parseEmbeddedLiSchema();
                    if (!_this.parseSuccess) {
                        await _this.parseViaInternalApi(false);
                    }
                } else {
                    await _this.parseViaInternalApi(false);
                    if (!_this.parseSuccess) {
                        await _this.parseEmbeddedLiSchema();
                    }
                }

                _this.scannedPageUrl = _this.getUrlWithoutQuery();
                _this.lastScannedLocale = localeToUse;
                _this.debugConsole.log(_this);
                resolve(true);
            }
        });
    };

    /** @param {SchemaVersion} version */
    LinkedinToResumeJson.prototype.parseAndGetRawJson = async function parseAndGetRawJson(version = 'stable') {
        await this.tryParse();
        let rawJson = version === 'stable' ? _outputJsonStable : _outputJsonLatest;

        // If beta, combine with latest
        if (version === 'beta') {
            rawJson = {
                ...rawJson,
                ..._outputJsonBetaPartial
            };
        }
        return rawJson;
    };

    /** @param {SchemaVersion} version */
    LinkedinToResumeJson.prototype.parseAndDownload = async function parseAndDownload(version = 'stable') {
        let rawJson = await this.parseAndGetRawJson(version);
        let fileName = `${_outputJsonStable.basics.name.replace(/\s/g, '_')}.resume.json`;
        let fileContents = JSON.stringify(rawJson, null, 2);
        this.debugConsole.log(fileContents);
        promptDownload(fileContents, fileName, 'application/json');
    };

    /** @param {SchemaVersion} version */
    LinkedinToResumeJson.prototype.parseAndShowOutput = async function parseAndShowOutput(version = 'stable') {
        let rawJson = await this.parseAndGetRawJson(version);
        let parsedExport = {
            raw: rawJson,
            stringified: JSON.stringify(rawJson, null, 2)
        };
        //  console.log(parsedExport);
        if (this.parseSuccess) {
            this.showModal(parsedExport.raw);
        } else {
            alert('Could not extract JSON from current page. Make sure you are on a profile page that you have access to');
        }
    };

    LinkedinToResumeJson.prototype.closeModal = function closeModal() {
        let modalWrapperId = `${_toolPrefix}_modalWrapper`;
        let modalWrapper = document.getElementById(modalWrapperId);
        if (modalWrapper) {
            modalWrapper.style.display = 'none';
        }
    };

    /**
     * Show the output modal with the results
     * @param {{[key: string]: any}} jsonResume - JSON Resume
     */
    LinkedinToResumeJson.prototype.showModal = async function showModal(jsonResume) {

        let website_list = [];
        let instant_mess = [];
        try {
            let contactInfo = await this.voyagerFetch(_voyagerEndpoints.contactInfo);
            //  console.log(contactInfo)
            if (contactInfo && typeof contactInfo.data === 'object') {
                // console.log(contactInfo.data)
                // console.log(contactInfo)
                let da = contactInfo.data.ims;
                let { websites, twitterHandles, phoneNumbers, emailAddress } = contactInfo.data;

                // console.log(da)
                if (da != null) {
                    for (let i = 0; i < da.length; i++) {
                        let obj = {};
                        obj.provider = da[i].provider;
                        obj.id = da[i].id;
                        instant_mess.push(obj);
                    }

                }


                for (let i = 0; i < websites.length; i++) {
                    let obj = {};
                    obj.category = websites[i].type.category;
                    obj.url = websites[i].url;
                    website_list.push(obj);

                };


            }
        } catch (e) {
            this.debugConsole.warn('Error parsing using internal API (Voyager) - Contact Info', e);
        }





        let profileResSummary = await this.getParsedProfile()
        let profile = profileResSummary.profileInfoObj;


        // console.log(skilllevel)
        // console.log(skillname)
        // console.log(window.location.href)
        // prateek code
        if (skillname.length > 0 && skilllevel.length > 0) {
            let sk = jsonResume.skills;
            for (let i = 0; i < sk.length; i++) {
                let nam = sk[i].name;
                let f = 1;
                for (let j = 0; j < skillname.length; j++) {
                    if (nam == skillname[j]) {
                        sk[i].level = skilllevel[j];
                        f = 0;
                        break;
                    }
                }
                if (f)
                    sk.splice(i, 1)
            }

        }
        if (entityurn != '')
            jsonResume.basics.entityurn = entityurn;


        let url = window.location.href.split('/');
        jsonResume.basics.publicIdentifier = url[url.length - 2]

        let arr = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

        let bdate = "";
        if (profile.birthDate != null)
            bdate = arr[profile.birthDate.month - 1] + " " + profile.birthDate.day;
        jsonResume.basics.birthDay = bdate;

        jsonResume.basics.website = website_list;
        jsonResume.basics.instant_mess = instant_mess;

        if (document.getElementsByClassName('artdeco-card ember-view pv-top-card').length > 0)
            jsonResume.basics.member_id = document.getElementsByClassName('artdeco-card ember-view pv-top-card')[0].getAttribute("data-member-id");


        // console.log(jsonResume);
        chrome.runtime.sendMessage({ action: "runcodemain_response", data: jsonResume });


        if (autoprof == 1) {
            // chrome.runtime.sendMessage({action:'jsondata',"text":jsonResume})
            div = document.getElementById('main');
            if (div.firstElementChild.classList.contains("ats_class") == true)
                div.firstElementChild.remove();

            chrome.runtime.sendMessage({ action: "auto_profile", portal: "LINKEDIN", data: jsonResume });

            autoprof = 0;
        }
        else
            chrome.runtime.sendMessage({ action: 'jsondata', "text": jsonResume })
        // console.log('sent')
        //  modalWrapper.style.display = 'block';
        //  } 
        //  else 
        //  {
        //     //  console.log(jsonResume);
        //      _this.injectStyles();
        //      modalWrapper = document.createElement('div');
        //      modalWrapper.id = modalWrapperId;
        //      modalWrapper.innerHTML = `<div class="${_toolPrefix}_modal">
        //          <div class="${_toolPrefix}_topBar">
        //              <div class="${_toolPrefix}_titleText">Profile Export:</div>
        //              <div class="${_toolPrefix}_closeButton">X</div>
        //          </div>
        //          <div class="${_toolPrefix}_modalBody">
        //              <textarea id="${_toolPrefix}_exportTextField">Export will appear here...</textarea>
        //          </div>
        //      </div>`;
        //      document.body.appendChild(modalWrapper);
        //      // Add event listeners
        //      modalWrapper.addEventListener('click', (evt) => {
        //          // Check if click was on modal content, or wrapper (outside content, to trigger close)
        //          // @ts-ignore
        //          if (evt.target.id === modalWrapperId) {
        //              _this.closeModal();
        //          }
        //      });
        //      modalWrapper.querySelector(`.${_toolPrefix}_closeButton`).addEventListener('click', () => {
        //          _this.closeModal();
        //      });
        //      /** @type {HTMLTextAreaElement} */
        //      let textarea = modalWrapper.querySelector(`#${_toolPrefix}_exportTextField`);
        //      textarea.addEventListener('click', () => {
        //          textarea.select();
        //      });
        //  }
        // Actually set textarea text
        /** @type {HTMLTextAreaElement} */
        //  let outputTextArea = modalWrapper.querySelector(`#${_toolPrefix}_exportTextField`);
        //  outputTextArea.value = JSON.stringify(jsonResume, null, 2);
    };

    LinkedinToResumeJson.prototype.injectStyles = function injectStyles() {
        if (!_stylesInjected) {
            let styleElement = document.createElement('style');
            styleElement.innerText = `#${_toolPrefix}_modalWrapper {
                 width: 100%;
                 height: 100%;
                 position: fixed;
                 top: 0;
                 left: 0;
                 background-color: rgba(0, 0, 0, 0.8);
                 z-index: 99999999999999999999999999999999
             }
             .${_toolPrefix}_modal {
                 width: 80%;
                 margin-top: 10%;
                 margin-left: 10%;
                 background-color: white;
                 padding: 20px;
                 border-radius: 13px;
             }
             .${_toolPrefix}_topBar {
                 width: 100%;
                 position: relative;
             }
             .${_toolPrefix}_titleText {
                 text-align: center;
                 font-size: x-large;
                 width: 100%;
                 padding-top: 8px;
             }
             .${_toolPrefix}_closeButton {
                 position: absolute;
                 top: 0px;
                 right: 0px;
                 padding: 0px 8px;
                 margin: 3px;
                 border: 4px double black;
                 border-radius: 10px;
                 font-size: x-large;
             }
             .${_toolPrefix}_modalBody {
                 width: 90%;
                 margin-left: 5%;
                 margin-top: 20px;
                 padding-top: 8px;
             }
             #${_toolPrefix}_exportTextField {
                 width: 100%;
                 min-height: 300px;
             }`;
            document.body.appendChild(styleElement);
        }
    };

    LinkedinToResumeJson.prototype.getUrlWithoutQuery = function getUrlWithoutQuery() {
        return document.location.origin + document.location.pathname;
    };

    /**
     * Get the profile ID / User ID of the user by parsing URL first, then page.
     */
    LinkedinToResumeJson.prototype.getProfileId = function getProfileId() {
        let profileId = '';
        let linkedProfileRegUrl = /linkedin.com\/in\/([^\/?#]+)[\/?#]?.*$/im;
        let linkedProfileRegApi = /voyager\/api\/.*\/profiles\/([^\/]+)\/.*/im;
        if (linkedProfileRegUrl.test(document.location.href)) {
            profileId = linkedProfileRegUrl.exec(document.location.href)[1];
        }

        // Fallback to finding in HTML source.
        // Warning: This can get stale between pages, or might return your own ID instead of current profile
        if (!profileId && linkedProfileRegApi.test(document.body.innerHTML)) {
            profileId = linkedProfileRegApi.exec(document.body.innerHTML)[1];
        }

        // In case username contains special characters
        return decodeURI(profileId);
    };

    /**
     * Get the local language identifier of the *viewer* (not profile)
     *  - This should correspond to LI's defaultLocale, which persists, even across user configuration changes
     * @returns {string}
     */
    LinkedinToResumeJson.prototype.getViewersLocalLang = () => {
        // This *seems* to correspond with profile.defaultLocale, but I'm not 100% sure
        let metaTag = document.querySelector('meta[name="i18nDefaultLocale"]');
        /** @type {HTMLSelectElement | null} */
        let selectTag = document.querySelector('select#globalfooter-select_language');
        if (metaTag) {
            return metaTag.getAttribute('content');
        }
        if (selectTag) {
            return selectTag.value;
        }
        // Default to English
        return 'en_US';
    };

    /**
     * Get the locales that the *current* profile (natively) supports (based on `supportedLocales`)
     * Note: Uses cache
     * @returns {Promise<string[]>}
     */
    LinkedinToResumeJson.prototype.getSupportedLocales = async function getSupportedLocales() {
        if (!_supportedLocales.length) {
            let { liResponse } = await this.getParsedProfile(true, null);
            let profileDb = buildDbFromLiSchema(liResponse);
            let userDetails = profileDb.getValuesByKey(_liSchemaKeys.profile)[0];
            if (userDetails && Array.isArray(userDetails['supportedLocales'])) {
                _supportedLocales = userDetails.supportedLocales.map((locale) => {
                    return `${locale.language}_${locale.country}`;
                });
            }
        }
        return _supportedLocales;
    };

    /**
     * Get the internal URN ID of the active profile
     *  - Not needed for JSON Resume, but for Voyager calls
     *  - ID is also used as part of other URNs
     * @param {boolean} [allowFetch] If DOM search fails, allow Voyager call to determine profile URN.
     * @returns {Promise<string>} profile URN ID
     */
    LinkedinToResumeJson.prototype.getProfileUrnId = async function getProfileUrnId(allowFetch = true) {
        let profileViewUrnPatt = /urn:li:fs_profileView:(.+)$/i;

        if (this.profileUrnId && this.scannedPageUrl === this.getUrlWithoutQuery()) {
            return this.profileUrnId;
        }

        // Try to use cache
        if (this.profileParseSummary && this.profileParseSummary.parseSuccess) {
            let profileDb = buildDbFromLiSchema(this.profileParseSummary.liResponse);
            this.profileUrnId = profileDb.tableOfContents['entityUrn'].match(profileViewUrnPatt)[1];
            return this.profileUrnId;
        }

        let endpoint = _voyagerEndpoints.fullProfileView;
        // Make a new API call to get ID - be wary of recursive calls
        if (allowFetch && !endpoint.includes(`{profileUrnId}`)) {
            let fullProfileView = await this.voyagerFetch(endpoint);
            let profileDb = buildDbFromLiSchema(fullProfileView);
            this.profileUrnId = profileDb.tableOfContents['entityUrn'].match(profileViewUrnPatt)[1];
            return this.profileUrnId;
        }
        this.debugConsole.warn('Could not scrape profileUrnId from cache, but fetch is disallowed. Might be using a stale ID!');

        // Try to find in DOM, as last resort
        let urnPatt = /miniprofiles\/([A-Za-z0-9-_]+)/g;
        let matches = document.body.innerHTML.match(urnPatt);
        if (matches && matches.length > 1) {
            // eslint-disable-next-line prettier/prettier
            // prettier-ignore
            this.profileUrnId = (urnPatt.exec(matches[matches.length - 1]))[1];
            return this.profileUrnId;
        }

        //  console.log(this.profileUrnId)
        return this.profileUrnId;
    };

    LinkedinToResumeJson.prototype.getDisplayPhoto = async function getDisplayPhoto() {
        let photoUrl = '';
        /** @type {HTMLImageElement | null} */
        let photoElem = document.querySelector('[class*="profile"] img[class*="profile-photo"]');
        if (photoElem) {
            photoUrl = photoElem.src;
        } else {
            // Get via miniProfile entity in full profile db
            let { liResponse, profileSrc, profileInfoObj } = await this.getParsedProfile();
            let profileDb = buildDbFromLiSchema(liResponse);
            let pictureMeta;
            if (profileSrc === 'profileView') {
                let miniProfile = profileDb.getElementByUrn(profileInfoObj['*miniProfile']);
                if (miniProfile && !!miniProfile.picture) {
                    pictureMeta = miniProfile.picture;
                }
            } else {
                pictureMeta = profileInfoObj.profilePicture.displayImageReference.vectorImage;
            }
            // @ts-ignore
            let smallestArtifact = pictureMeta.artifacts.sort((a, b) => a.width - b.width)[0];
            photoUrl = `${pictureMeta.rootUrl}${smallestArtifact.fileIdentifyingUrlPathSegment}`;
        }

        return photoUrl;
    };

    LinkedinToResumeJson.prototype.generateVCard = async function generateVCard() {
        let profileResSummary = await this.getParsedProfile();
        let contactInfoObj = await this.voyagerFetch(_voyagerEndpoints.contactInfo);
        this.exportVCard(profileResSummary, contactInfoObj);
    };
    //  function prateek()
    //  {
    //     let profileResSummary = await this.getParsedProfile();
    //     let contactInfoObj = await this.voyagerFetch(_voyagerEndpoints.contactInfo);
    //     this.exportVCard(profileResSummary, contactInfoObj);
    //  }


    /**
     * @param {ParseProfileSchemaResultSummary} profileResult
     * @param {LiResponse} contactInfoObj
     */
    LinkedinToResumeJson.prototype.exportVCard = async function exportVCard(profileResult, contactInfoObj) {
        let vCard = VCardsJS();
        let profileDb = buildDbFromLiSchema(profileResult.liResponse);
        let contactDb = buildDbFromLiSchema(contactInfoObj);
        // Contact info is stored directly in response; no lookup
        let contactInfo = /** @type {LiProfileContactInfoResponse['data']} */ (contactDb.tableOfContents);
        let profile = profileResult.profileInfoObj;
        vCard.formattedName = `${profile.firstName} ${profile.lastName}`;
        vCard.firstName = profile.firstName;
        vCard.lastName = profile.lastName;
        // Geo
        if ('postalCode' in profile.geoLocation) {
            // @ts-ignore
            vCard.homeAddress.postalCode = profile.geoLocation.postalCode;
        }
        vCard.email = contactInfo.emailAddress;
        if (contactInfo.twitterHandles.length) {
            // @ts-ignore
            vCard.socialUrls['twitter'] = `https://twitter.com/${contactInfo.twitterHandles[0].name}`;
        }
        if (contactInfo.phoneNumbers) {
            contactInfo.phoneNumbers.forEach((numberObj) => {
                if (numberObj.type === 'MOBILE') {
                    vCard.cellPhone = numberObj.number;
                } else if (numberObj.type === 'WORK') {
                    vCard.workPhone = numberObj.number;
                } else {
                    vCard.homePhone = numberObj.number;
                }
            });
        }
        // At a minimum, we need month and day in order to include BDAY
        // console.log(profile.birthDate)
        if (profile.birthDate && 'day' in profile.birthDate && 'month' in profile.birthDate) {
            let birthdayLi = /** @type {LiDate} */ (profile.birthDate);
            if (!birthdayLi.year) {
                /**
                 * Users can choose to OMIT their birthyear, but leave month and day (thus hiding age)
                 * - vCard actually allows this in spec, but only in > v4 (RFC-6350): https://tools.ietf.org/html/rfc6350#:~:text=BDAY%3A--0415, https://tools.ietf.org/html/rfc6350#section-4.3.1
                 *       - Governed by ISO-8601, which allows truncated under ISO.8601.2000, such as `--MMDD`
                 *       - Example: `BDAY:--0415`
                 * - Since the vCard library I'm using (many platforms) only support V3, I'll just exclude it from the vCard; including a partial date in v3 (violating the spec) will result in a corrupt card that will crash many programs
                 */
                console.warn(`Warning: User has a "partial" birthdate (year is omitted). This is not supported in vCard version 3 or under.`);
            } else {
                // Full birthday (can be used for age)
                vCard.birthday = liDateToJSDate(birthdayLi);
            }
        }
        // Try to get currently employed organization
        let positions = this.getWorkPositions(profileDb);
        if (positions.length) {
            vCard.organization = positions[0].companyName;
            vCard.title = positions[0].title;
        }
        vCard.workUrl = this.getUrlWithoutQuery();
        vCard.note = profile.headline;
        // Try to get profile picture
        let photoUrl;
        try {
            photoUrl = await this.getDisplayPhoto();
        } catch (e) {
            this.debugConsole.warn(`Could not extract profile picture.`, e);
        }
        if (photoUrl) {
            try {
                // Since LI photo URLs are temporary, convert to base64 first
                let photoDataBase64 = await urlToBase64(photoUrl, true);
                // @ts-ignore
                vCard.photo.embedFromString(photoDataBase64.dataStr, photoDataBase64.mimeStr);
            } catch (e) {
                this.debugConsole.error(`Failed to convert LI image to base64`, e);
            }
        }
        let fileName = `${profile.firstName}_${profile.lastName}.vcf`;
        let fileContents = vCard.getFormattedString();
        this.debugConsole.log('vCard generated', fileContents);
        promptDownload(fileContents, fileName, 'text/vcard');
        return vCard;
    };

    /**
     * API fetching, with auto pagination
     * @param {string} fetchEndpoint
     * @param {Record<string, string | number>} [optHeaders]
     * @param {number} [start]
     * @param {number} [limitPerPage]
     * @param {number} [requestLimit]
     * @param {number} [throttleDelayMs]
     * @returns {Promise<LiResponse[]>} responseArr
     */
    LinkedinToResumeJson.prototype.voyagerFetchAutoPaginate = async function voyagerFetchAutoPaginate(
        fetchEndpoint,
        optHeaders = {},
        start = 0,
        limitPerPage = 20,
        requestLimit = 100,
        throttleDelayMs = 100
    ) {
        /** @type {LiResponse[]} */
        let responseArr = [];
        let url = await this.formatVoyagerUrl(fetchEndpoint);
        let done = false;
        let currIndex = start;
        let requestsMade = 0;
        /** @type {(value?: any) => void} */
        let resolver;
        /** @type {(reason?: any) => void} */
        let rejector;

        /**
         * @param {any} pagingObj
         */
        let handlePagingData = (pagingObj) => {
            if (pagingObj && typeof pagingObj === 'object' && 'total' in pagingObj) {
                currIndex = pagingObj.start + pagingObj.count;
                done = currIndex >= pagingObj.total;
            } else {
                done = true;
            }
        };

        /** @param {LiResponse} liResponse */
        let handleResponse = async (liResponse) => {
            requestsMade++;
            responseArr.push(liResponse);
            handlePagingData(liResponse.data.paging);
            if (!done && requestsMade < requestLimit) {
                await new Promise((res) => {
                    setTimeout(() => {
                        res();
                    }, throttleDelayMs);
                });
                url = setQueryParams(url, {
                    start: currIndex,
                    count: limitPerPage
                });
                try {
                    let response = await this.voyagerFetch(url, optHeaders);
                    // Recurse
                    handleResponse(response);
                } catch (e) {
                    // BAIL
                    done = true;
                    this.debugConsole.warn(`Bailing out of auto-fetch, request failed.`, e);
                }
            } else {
                done = true;
            }

            if (done) {
                if (responseArr.length) {
                    resolver(responseArr);
                } else {
                    rejector(new Error(`Failed to make any requests`));
                }
            }
        };

        // Start off the pagination chain
        this.voyagerFetch(
            setQueryParams(url, {
                start: currIndex,
                count: limitPerPage
            })
        ).then(handleResponse);

        return new Promise((res, rej) => {
            resolver = res;
            rejector = rej;
        });
    };

    /**
     * Simple formatting for Voyager URLs - macro support, etc.
     * @param {string} fetchEndpoint
     * @returns {Promise<string>} formattedUrl
     */
    LinkedinToResumeJson.prototype.formatVoyagerUrl = async function formatVoyagerUrl(fetchEndpoint) {
        // Macro support
        let endpoint = fetchEndpoint;
        if (endpoint.includes('{profileId}')) {
            endpoint = fetchEndpoint.replace(/{profileId}/g, this.getProfileId());
        }
        if (endpoint.includes('{profileUrnId}')) {
            let profileUrnId = await this.getProfileUrnId();
            endpoint = endpoint.replace(/{profileUrnId}/g, profileUrnId);
        }
        if (!endpoint.startsWith('https')) {
            endpoint = _voyagerBase + endpoint;
        }
        return endpoint;
    };

    /**
     * Special - Fetch with authenticated internal API
     * @param {string} fetchEndpoint
     * @param {Record<string, string | number>} [optHeaders]
     * @returns {Promise<LiResponse>}
     */
    LinkedinToResumeJson.prototype.voyagerFetch = async function voyagerFetch(fetchEndpoint, optHeaders = {}) {
        let _this = this;
        let endpoint = await _this.formatVoyagerUrl(fetchEndpoint);
        // Set requested language
        let langHeaders = {};
        if (_this.preferLocale) {
            langHeaders = {
                'x-li-lang': _this.preferLocale
            };
        }
        return new Promise((resolve, reject) => {
            // Get the csrf token - should be stored as a cookie
            let csrfTokenString = getCookie('JSESSIONID').replace(/"/g, '');
            if (csrfTokenString) {
                /** @type {RequestInit} */
                let fetchOptions = {
                    credentials: 'include',
                    headers: {
                        ...langHeaders,
                        ...optHeaders,
                        accept: 'application/vnd.linkedin.normalized+json+2.1',
                        'csrf-token': csrfTokenString,
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin'
                    },
                    referrer: document.location.href,
                    body: null,
                    method: 'GET',
                    mode: 'cors'
                };
                fetch(endpoint, fetchOptions).then((response) => {
                    //  if (response.status !== 200) 
                    //  {
                    //     let errStr = 'Error fetching internal API endpoint';
                    //     reject(new Error(errStr));
                    //     console.warn(errStr, response);
                    //  }
                    // else 
                    // {
                    response.text().then((text) => {
                        try {
                            //  /** @type {LiResponse} */
                            let parsed = JSON.parse(text);
                            // console.log(parsed)
                            if (!!_this.preferLocale && _this.preferLocale !== _defaultLocale) {
                                _this.debugConsole.log(`Checking for locale mapping and remapping if found.`);
                                remapNestedLocale(parsed.included, this.preferLocale, true);
                            }

                            resolve(parsed);
                        } catch (e) {
                            console.warn('Error parsing internal API response', response, e);
                            reject(e);
                        }
                    });
                    // }
                });
            } else {
                reject(new Error('Could not find valid LI cookie'));
            }
        });
    };

    return LinkedinToResumeJson;
})();



var extensionId = chrome.runtime.id;
var STORAGE_KEYS = {
    schemaVersion: 'schemaVersion'
};
var SPEC_SELECT = (document.getElementById('specSelect'));
var SPEC_OPTIONS = ['beta', 'stable', 'latest'];
var LANG_SELECT = document.querySelector('.langSelect');

var createMessageSenderInjectable = (valueToCapture, optKey) => {
    return `chrome.runtime.sendMessage('${extensionId}', {
            key: '${optKey || valueToCapture}',
            value: ${valueToCapture}
        });`;
};

isDebug = window.location.href.includes('li2jr_debug=true');
window.LinkedinToResumeJson = isDebug ? LinkedinToResumeJson : window.LinkedinToResumeJson;


// Reuse existing instance if possible
liToJrInstance = typeof (liToJrInstance) !== 'undefined' ? liToJrInstance : new LinkedinToResumeJson(isDebug);



function run_code() {
    div = document.getElementById('main');
    if (div.firstElementChild.classList.contains("ats_class") == true)
        div.firstElementChild.remove();

    autoprof = 1;
    liToJrInstance.preferLocale = 'en_US'; liToJrInstance.parseAndShowOutput('stable');

}
function runcodemain() {
    liToJrInstance.preferLocale = 'en_US'; liToJrInstance.parseAndShowOutput('stable');

}
if (window.location.href.includes('https://www.linkedin.com/in/') && window.location.href.split('/').length == 6)
    run_code();


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == 'runcodemain') {

        runcodemain();
    }


})