# NClientV3
仿NClientV2，使用uniapp vue3开发

## 数据

1. 当前页面的筛选条件
2. 当前页面的展示数据
3. 当前画廊的数据
4. 用户数据
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
