const express = require('express');
const app = express();

app.use('/static', express.static(__dirname+'public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{

    let mascots = [{
        name: 'Sammy', organization: 'Linux', birth_year: 1996
    },{
        name: 'Tux', organization: 'Linux', birth_year: 1996
    },{ name: 'Moby Dock', organization: 'Docker', birth_year: 1996
    }];
    let tagline = "no programming";
    
    
    res.render(
        './pages/index',
        {
            mascots: mascots,
            tagline: tagline
        }
        );    
});

app.get('/about', (req,res)=>{
    res.render('./pages/about')
});


const PORT = 8080;
app.listen(PORT,()=>{console.log(`Server Up en ${PORT}`)});