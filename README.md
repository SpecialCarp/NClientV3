# NClientV3
仿NClientV2，使用uniapp vue3开发

## 数据

### 当前页面的筛选条件

```ts
/**
 * 标签类型
 */
enum TagType {
	/**
	 * 语言
	 */
	language = "language",
	/**
	 * 原作
	 */
	parody = "parody",
	/**
	 * 角色
	 */
	character = "character",
	/**
	 * 标签
	 */
	tag = "tag",
	/**
	 * 作者
	 */
	artist = "artist",
	/**
	 * 分组
	 */
	group = "group",
	/**
	 * 分类
	 */
	category = "category",
}

/**
 * 模拟搜索参数
 */
class QueryParam {
	/**
	 * 直接在搜索框中查找
	 */
	value: String = "";
	/**
	 * 通过标签限制搜索范围
	 */
	tags: Array<{ condition: TagType; value: String; exclude: Boolean }> = [];
	/**
	 * 通过画廊的页数限制范围
	 */
	pages: Array<String> = [];
	/**
	 * 根据更新时间限制范围
	 */
	uploaded: String = "";

	/**
	 * 获取查询参数
	 * 如果没有限制条件则返回 `-nhentaiv3`
	 * @returns `${search} ${condition}:"${value} pages:${pages} uploaded:${uploaded}`
	 */
	getParams(): String {
		let params = "";
		if (this.hasText(this.value)) {
			params += this.value;
		}
		if (this.tags != null && this.tags.length > 0) {
			this.tags.forEach((item) => {
				params += `+${item.exclude ? "-" : ""}${item.condition}:"${
					item.value
				}"`;
			});
		}
		if (this.pages != null && this.pages.length > 0) {
			this.pages.forEach((item) => {
				params += `+pages:${item}`;
			});
		}
		if (this.hasText(this.uploaded)) {
			params += `+uploaded:${this.uploaded}`;
		}
		if (this.hasText(params)) {
			return params.replace(/^\+/g,"");
		} else {
			return "-nhentaiv3";
		}
	}

	private hasText(s: String) {
		return s !== null && s.trim() !== "";
	}
}

/**
 * 排序枚举
 */
enum Sort {
	/**
	 * 默认排序
	 */
	unknown = "unknown",
	/**
	 * 热门（总榜）
	 */
	all = "popular",
	/**
	 * 日榜
	 */
	today = "popular-today",
	/**
	 * 周榜
	 */
	week = "popular-week",
	/**
	 * 月榜
	 */
	month = "popular-month",
}
```

### 当前页面的展示数据

```ts
class Gallery {
	id: String;
	title: String;
	cover: String;
	tags: Array<Tag>;
	pages: Number;
	upload: Date;
	thumbs: Array<Thumb>;
}

class Tag {
	id: String;
	name: String;
	count: String | Number;
	type: TagType;
}

class Thumb {
	id: String;
	galleryID: String;
	index: Number;
	small: File;
	medium: File;
	large: File;
}

enum TagType {
	language = "language",
	parody = "parody",
	character = "character",
	tag = "tag",
	artist = "artist",
	group = "group",
	category = "category",
}
```



```ts
page: Number
maxPage: Number
queryParam: String
uri: String
galleries: Array<{tags: Array<String>, title: String, language: String, id: String|Number, cover: String}:Object>
sort: Enum
language: String
tags: Array<{String: Array<String>}:Object>

```



1. 当前画廊的数据
2. 用户数据
  - 用户本地数据：
  	1. 收藏
  	2. 历史记录
  	3. 下载
  	4. 正在阅读
  	5. 书签
  - 用户在线数据：TODO:待定

## 查询筛选条件

### `/search/?q=${query}`：搜索查找数据

> 使用 `q` 作为参数时，*uri* 必须是 `/search/`

`q` 的值为网页 `https://nhentai.net/search/` 中的搜索框中的值。

#### `q=${search}`

`q` 的值使用**一段文本**，会根据标题、标签等进行查找。

例如：

```
https://nhentai.net/search/?q=Saimin
https://nhentai.net/search/?q=sleeping
https://nhentai.net/search/?q=rem
```

优缺点：很宽泛，查询逻辑也很迷

#### `q=${condition}:"${value}"` 或 `q=${condition}:${value}`

`q` 的值使用格式为 **条件:"值"** 的字符串，通过特定条件去限制查找范围。

**condition** 的值是可数的：

- `parody`：[原作](https://nhentai.net/parodies/)
- `character`：[角色](https://nhentai.net/characters/)
- `tag`：[标签](https://nhentai.net/tags/)
- `artist`：[作家](https://nhentai.net/artists/)
- `group`：[分组](https://nhentai.net/groups/)
- `language`：语言
- `category`：分类
- `pages`：页数

注意：pages 这个条件比较特殊，他的值是是由**比较符号（`<`、`<=`、`=`、`>`、`>=`）加上画廊页数组成**。

```
https://nhentai.net/search/?q=language:"chinese"
https://nhentai.net/search/?q=tag:"mind control"
https://nhentai.net/search/?q=pages:<=23
```

> `language` 参数的值，只有 `chinese`、`english`、`japanese` 三个。

如果要排除某个条件可以在条件前添加 `-` ，例如：

```
https://nhentai.net/search/?q=-group:"angyadow"
```

多个条件之间以**空格**或**加号**的形式拼接成 `q` 的值

````
https://nhentai.net/search/?q=Mikko+-parody:"azur+lane"+parody:"girls+und+panzer"+language:"chinese"+-parody:"the+idolmaster"
````

### `?sort=${popular}`：排序方式

`sort` 相关画廊的排序方式，值是可数的：

- `popular`：[热门（所有时间）](https://nhentai.net/search/?q=-nclientv3&sort=popular)
- `popular-today`：[日榜](https://nhentai.net/search/?q=-nclientv3&sort=popular-today)
- `popular-week`：[周榜](https://nhentai.net/search/?q=-nclientv3&sort=popular-week)
- `popular-month`：[月榜](https://nhentai.net/search/?q=+language%3A%22chinese%22&page=1&sort=popular-month)

注：没有年榜。

### `?page=${index}`：当前页

`page` 跳转到对应页数，一般来说一页会返回 25 个画廊。

## 提取数据

### 主页（查询页）

* 书籍信息：`div#content div.container div.gallery`
* 封面：`div#content div.container div.gallery img.lazyload` 的 `data-src` 属性
* 标题：`div#content div.container div.gallery div.caption` 的文本内容
* 画廊id：`div#content div.container div.gallery a` 的 `href` 属性，使用正则提取 `/\\g\\(\d+)\\/`
* 标签：`div#content div.container div.gallery` 的 `data-tags` 属性，使用空格分隔，所有的标签，包括：语言、分类、作家等都放到这个元素中
  * *29963* 是中文，*12227* 是英文，*6346* 是日文
* 最大页数：`div#content section.pagination a.last` 的 `href` 属性，使用正则提取 `.*page=(\d+).*`

### 画廊页（漫画页）

* 封面：`div#content div#container div#cover img.lazyload` 的 `data-src` 属性
* tags：
* language：
* upload：
* pages：
* thumbs：
* Likes：
* comments：



## 其他

### 随机页

`https://nhentai.net/random/`

### 收藏页

`https://nhentai.net/favorites/`

### 个人页

`https://nhentai.net/users/${userid}/${username}`

### 在线登陆
