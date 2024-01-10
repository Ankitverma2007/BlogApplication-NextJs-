import { query } from '../DBconfig.js';

export default async function handler(req, res) {
	try {
		const { blogID } = req.query;
		const method = req.method;

		if (!blogID) {
			return res.status(400).send('Blog ID is required');
		}

		switch (method) {
			case 'GET':
				try {
					const results = await query(
						'SELECT * FROM blogs WHERE blogID=?',
						[blogID]
					);

					if (results.length === 0) {
						return res.status(404).send('Not Found');
					}

					res.status(200).send(results[0]);
				} catch (error) {
					res.status(400).send(error.message);
				}
				break;

			case 'PUT':
				try {
					const {Tittle, Descreption } = JSON.parse(
						req.body
					);
					const results = await query(
						'SELECT * FROM services WHERE blogID=?',
						[blogID]
					);

					if (results.length === 0) {
						return res.status(404).send('Not Found');
					}

					const updateFields = [];
					const updateValues = [];

					if (Tittle) {
						updateFields.push('Tittle=?');
						updateValues.push(Tittle);
					}

					if (Descreption) {
						updateFields.push('Descreption=?');
						updateValues.push(Descreption);
					}

				

					if (updateFields.length === 0) {
						return res.status(400).send('No fields to update');
					}

					const updateClause = updateFields.join(', ');

					const sql = `UPDATE Tittle SET ${updateClause} WHERE blogID=?`;
					const values = [...updateValues, blogID];

					await query(sql, values);

					res.status(200).send('Blog Updated');
				} catch (error) {
					res.status(400).send(error.message);
				}
				break;

			case 'DELETE':
				try {
					const results = await query(
						'SELECT * FROM blogs WHERE blogID=?',
						[blogID]
					);

					if (results.length === 0) {
						return res.status(404).send('Not Found');
					}
					
					await query(`DELETE FROM blogs WHERE BlogID=?`, [blogID]);

					res.status(200).send('Blog Deleted');
				} catch (error) {
					res.status(400).send(error.message);
				}
				break;
			default:
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
}