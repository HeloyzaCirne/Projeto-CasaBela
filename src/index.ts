import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/styles', express.static(path.join(__dirname, 'views', 'styles')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
app.use(express.static("public"));
*/
// app.use("/users", usersRouter);
// app.use("/api", productsRouter);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
