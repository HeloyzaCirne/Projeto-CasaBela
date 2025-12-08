import productsRouter from './routes/products.route';
import usersRouter from './routes/users.route';
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/css', express.static(path.join(__dirname, 'views', 'css')));
app.use('/js', express.static(path.join(__dirname, 'views', 'js')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
app.use(express.static("public"));
*/
// app.use("/api", productsRouter);

app.use("/usuario", usersRouter);
app.use("/produtos", productsRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
