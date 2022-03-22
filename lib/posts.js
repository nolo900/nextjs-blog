import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(){
	// Get file names under posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map(fileName => {
		// strip .md from filename to get 'id'
		const id = fileName.replace(/\.md$/,'')

		// read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// use gray matter to parse file metadata
		const matterResult = matter(fileContents)

		// combine data with the id
		return {
			id,
			...matterResult.data
		}
	})

	return allPostsData.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1
		} else if (a > b) {
			return -1
		} else {
			return 0
		}
	})

}