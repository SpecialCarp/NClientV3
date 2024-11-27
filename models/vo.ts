import { TagType, Language } from './enums';

/**
 * 模拟搜索参数
 */
class QueryParam {
	/**
	 * 直接在搜索框中查找
	 */
	value: String = '';
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
	uploaded: String = '';

	/**
	 * 获取查询参数
	 * 如果没有限制条件则返回 `-nhentaiv3`
	 * @returns `${search} ${condition}:"${value} pages:${pages} uploaded:${uploaded}`
	 */
	getParams(): String {
		let params = '';
		if (this.hasText(this.value)) {
			params += this.value;
		}
		if (this.tags != null && this.tags.length > 0) {
			this.tags.forEach((item) => {
				params += `+${item.exclude ? '-' : ''}${item.condition}:"${item.value}"`;
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
			return params.replace(/^\+/g, '');
		} else {
			return '-nhentaiv3';
		}
	}

	private hasText(s: String) {
		return s !== null && s.trim() !== '';
	}
}
