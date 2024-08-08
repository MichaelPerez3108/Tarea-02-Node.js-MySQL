import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/add', async (req,res)=>{
    const [tipos_personas] = await pool.query('SELECT * FROM tipopersona');
    res.render('personas/add', {tipos:tipos_personas});
});

router.post('/add', async (req,res)=>{
    try{
        const {name,lastname,age,tipo_persona} = req.body;
        const newPersona = {
            name, lastname, age,tipo_persona
        }
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message,datos:req.body}); 
    }
});

router.get('/list', async (req,res)=>{
    try{
        const [result] = await pool.query('SELECT personas.id, personas.name, personas.lastname, personas.age, tipopersona.nombre as TipoPersona FROM personas JOIN tipopersona on personas.tipo_persona = tipopersona.idTp');
        res.render('personas/list', {personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/edit/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const [persona] = await pool.query('SELECT personas.id, personas.name, personas.lastname, personas.age, tipopersona.nombre as TipoPersona FROM personas JOIN tipopersona on personas.tipo_persona = tipopersona.idTp WHERE id = ?', [id]);
        const [tipos_personas] = await pool.query('SELECT * FROM tipopersona');
        const personaEdit = persona[0];
        res.render('personas/edit', {persona: personaEdit,tipos:tipos_personas});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/edit/:id', async (req,res)=>{
    try{
        const {name, lastname, age,tipo_persona} = req.body;
        const {id} = req.params;
        const editPersona = {name, lastname, age,tipo_persona};
        await pool.query('UPDATE personas SET ? WHERE id = ?',[editPersona, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/delete/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;