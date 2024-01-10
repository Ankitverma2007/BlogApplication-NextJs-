import { query } from "../dbConfig";

export default async function handler(req, res) {
  try {
    const method = req.method;

    switch (method) {
      case "GET":
        try {
          const results = await query("SELECT *, BlogID as id FROM blogs");
          res.status(200).send(results);
        } catch (error) {
          handleError(res, error, 400);
        }
        break;

      case "POST":
        try {
          const { Tittle, Descreption, BlogID } = JSON.parse(req.body);

          if (!Tittle || !Descreption) {
            return res
              .status(400)
              .send("Required parameters missing or invalid");
          }

          const existingBlog = await query(
            "SELECT * FROM blogs WHERE BlogID = ?",
            [BlogID]
          );

          if (existingBlog.length > 0) {
            return res.status(409).send("Blog already exists");
          }

          const result = await query(
            "INSERT INTO blogs (Tittle, Descreption, BlogID) VALUES (?,?,?)",
            [Tittle, Descreption, BlogID]
          );

          res
            .status(201)
            .send({ message: "Blog created", insertId: result.insertId });
        } catch (error) {
          handleError(res, error, 400);
        }
        break;

      default:
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    handleError(res, error, 500);
  }
}

function handleError(res, error, statusCode) {
  console.error(error);
  res.status(statusCode).send(error.message);
}
