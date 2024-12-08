import { ref, computed } from "vue";
import * as cheerio from "cheerio";
import Gallery from "@/models/Gallery";

const sorts = ["popular", "popular-today", "popular-week", "popular-mouth"];
const languages = ["chinese", "english", "japanese"];

export const galleries = ref([]);

// https://nhentai.net/search/?q=+language%3A%22chinese%22&page=1&sort=popular
// https://nhentai.net/search/?q=+language%3A%22chinese%22&page=1&sort=popular-week
export const getPage = ({
	page = 1,
	sort = null,
	language = "chinese",
	tag = null,
	artist = null,
	character = null,
	parody = null,
	category = null,
} = {}) => {
	let param = [],
		uri = "";
	if (page != null && typeof page === "number") {
		param.push(`page=${page}`);
	}
	if (sort != null && typeof sort === "string" && sorts.includes(sort)) {
		param.push(`sort=${sort}`);
	}

	if (
		language != null ||
		tag != null ||
		artist != null ||
		character != null ||
		parody != null ||
		category != null
	) {
		uri = "/search/";
		let searchParam = [];

		if (
			language != null &&
			typeof language === "string" &&
			languages.includes(language)
		)
			searchParam.push(`language:"${language}"`);

		if (tag != null && typeof tag === "string")
			searchParam.push(`tag:"${tag}"`);
		if (artist != null && typeof artist === "string")
			searchParam.push(`artist:"${artist}"`);
		if (character != null && typeof character === "string")
			searchParam.push(`character:"${character}"`);
		if (parody != null && typeof parody === "string")
			searchParam.push(`parody:"${parody}"`);
		if (category != null && typeof category === "string")
			searchParam.push(`category:"${category}"`);

		param.push(`q=${encodeURIComponent(searchParam.join(" "))}`);
	}

	let url = "https://nhentai.net" + uri + "?" + param.join("&");

	uni.request({
		url: "https://api.allorigins.win/get?url=" + encodeURIComponent(url),
		method: "GET",
		success(res) {
			let { contents, status } = res.data;
			const $ = cheerio.load(contents);
			const gallery_list = $(".container.index-container").find(
				".gallery"
			);
			// console.log(gallery_list);
			gallery_list.each((index, elem) => {
				// 使用 $(element) 将 DOM 元素包装成 Cheerio 对象，方便操作
				const gallery = $(elem);
				const title = gallery.find(".caption").text();
				const thumbnail = gallery.find("img").attr("data-src");
				const link = gallery.find("a").attr("href");
				// console.log(gallery.attr("data-tags"));
				const tags = gallery.attr("data-tags").split(/\s+/);
				galleries.value.push({
					title,
					thumbnail,
					link,
					tags,
					language: checkLanguage(tags),
				});
			});
		},
		fail(err) {},
	});
};

const language_icons = ref({
	chinese:
		"data:image/gif;base64,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",
	japanese:
		"data:image/gif;base64,R0lGODlhSAAwAOZhAO1UZPn6/PX+//X8//z9/vX4+/X//////+1TY+1PX/X7/vX7/fb///X9/+1SYvf4++1QYOxMXPn7/P7+//Xw9PXx9fGjre5pd/X8/vb4+/GnsPPN1O1OX/CQm+95hvTd4vXy9vGXovTb4PCVoO1TZPPS1+1OXu1QYfPT2fTm6/Ggqu1dbfX5/O5icPCSnfCTne1RYvTq7u5hcfGkrvTv8+5jce1UZfTr7/To7fKqsvPJz+1WZvPO0/CTnvXt8fPP1e93g/K0vPLEy/LEzO1PYO1YaO+Aje5od+1ZaPLDy+5gb/LFzO5ice+Klu1XZ++Cju1YZ+5hcPXs8PGirOxKW++JlexLXO+CjfK2v/K2vfXs8e+BjPG0u+5hb+1VZfb4+vX3+v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAABIADAAAAf/gGFhBwQBD1+IiYqLjI2Oj5CLDwEEB4JhEwFfYJydnp+goaKjpKNfARODEqWsra6vnRKEm7C1trBfhbe7vKQBGb3BwmCHw8a3iMfKr8nLzqTNz9Kf0dPW1dbS2NnO28MFCw0CBgINCwXdtMcFAz5LFi9NLxZCWgMsyt68GCBYTxdIIFhJAOWCkSAVBhzTdwsDjhBMIiRwAMALAAcJInQZkULhMIa1GtzoAYCIl5MoUUIg0SGGgI/qeimokGMHgpQ4T97UQEGBMJCvBJSoASOnUQcteAhA1wtoqwUUZnCwYdSoCRU0fDaNucvABw83q+ZEAESEgWBOWRlAIaOiWJwA0Fb8YICW6y0GGyy+zXlCB92twvDq3Zuy719eaUutbUsYZdy5dYV5BdtYZ9mzgINBlUq18dWskYUJJdoYqVKmiO3emlkzrNidPX+qviWSJASxK1u+lH3MYYgoEilaxBhBCUePvI8NAJHlyoUiCagkcHJkC5eEC2fzYudjiAUXVVxMSSLlXj7tvcCJI2cOdXZu19DDDz0/Xf1nie/jkq/fVv7+rXwBDIDGZBAAgcZQwh+CpeRywCoM8iILJppEWMspqQhCiCGRdOjhh5BMUokggQAAOw==",
	english:
		"data:image/gif;base64,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",
});

export const getIcon = (language) => {
	return language_icons.value[language];
};

function checkLanguage(array) {
	if (array.includes("29963")) {
		return "chinese";
	} else if (array.includes("6346")) {
		return "japanese";
	} else if (array.includes("12227")) {
		return "english";
	} else {
		return "unknown";
	}
}
