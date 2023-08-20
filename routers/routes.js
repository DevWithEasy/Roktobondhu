const authRouter = require('./authRouter')
const contributerRouter = require('./contributerRouter')
const blogRouter = require('./blogRouter')
const routers = [
    {
        path : '/api/auth',
        handler : authRouter
    },
    {
        path : '/api/contributer',
        handler : contributerRouter
    },
    {
        path : '/api/blog',
        handler : blogRouter
    }
    // {
    //     path : '/',
    //     handler : (req,res) =>{
    //         res.send('Server is ready!');
    //     }
    // }
]

const applyRouter = (app) =>{
    routers.map(r=>{
        if(r.path === '/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}

module.exports = applyRouter