import api from './api.js';
import GitHubFileURL from './github-file-url.js';

export default async function doesFileExist(url: GitHubFileURL): Promise<boolean> {
	const {repository} = await api.v4(`
		query doesFileExist($owner: String!, $name: String!, $file: String!) {
			repository(owner: $owner, name: $name) {
				file: object(expression: $file) {
					id
				}
			}
		}
	`, {
		variables: {
			owner: url.user,
			name: url.repository,
			file: `${url.branch}:${url.filePath}`,
		},
	});

	return Boolean(repository.file);
}
