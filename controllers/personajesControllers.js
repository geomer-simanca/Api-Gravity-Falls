const supabase = require('../database/coneccion.js')

class Personajes{

    constructor(){}

    async consularPersonajes(req,res){
        try{

            const {data, error} = await supabase
                .from('personajes')
                .select(`
                    id_personaje,
                    nombre,
                    edad,
                    altura,
                    frase,
                    imagen,
                    tipos (
                        nombre,
                        descripcion
                    ),
                    niveles_poder (
                        nombre,
                        descripcion
                    ),
                    pueblos (
                        nombre,
                        descripcion
                    )
                `);

            if (error) throw error;

            const personajes = data.map(p => ({
                id_personaje: p.id_personaje,
                nombre: p.nombre,
                edad: p.edad,
                altura: p.altura,
                frase: p.frase,
                imagen: p.imagen,
                tipo_de_poder: p.tipos,         // renombrado
                nivel_de_poder: p.niveles_poder, // renombrado
                origen: p.pueblos                // renombrado
            }));

            res.json({ personajes });

        }catch(error){

            res.status(500).json({
                msg:'error al intentar consultar todos los personajes',
                error:error.message
            })

        }
    }

    async consultarPersonaje(req,res){
        try{
            const {id} = req.params

            const {data, error} = await supabase
                .from('personajes')
                .select(`
                    id_personaje,
                    nombre,
                    edad,
                    altura,
                    frase,
                    imagen,
                    tipos (
                        nombre,
                        descripcion
                    ),
                    niveles_poder (
                        nombre,
                        descripcion
                    ),
                    pueblos (
                        nombre,
                        descripcion
                    )
                `)
                .eq('id_personaje',id)
                .single()

                if (error) throw error;

                const personaje = {
                    id_personaje: data.id_personaje,
                    nombre: data.nombre,
                    edad: data.edad,
                    altura: data.altura,
                    frase: data.frase,
                    imagen: data.imagen,
                    tipo_de_poder: data.tipos,
                    nivel_de_poder: data.niveles_poder,
                    origen: data.pueblos
                };

                res.json( personaje );





        }catch(error){

            res.status(500).json({
                msg:`error al intentar consultar el usuario ${req.params.id}`,
                error:error.message
            })

        }
    }

    async agregarPersonaje(req,res){
        try{

            const {nombre, edad , altura , frase , id_tipo , id_nivel , id_pueblo , imagen}  =req.body

            if (!nombre || !edad || !altura || !frase || !id_tipo || !id_nivel || !id_pueblo || !imagen === undefined){
                return res.status(400).json({msg:'nombre, edad , altura , frase , id_tipo , id_nivel , id_pueblo , imagen'})
            }

            const {data,error} = await supabase
                .from('personajes')
                .insert([
                    {nombre, edad , altura , frase , id_tipo , id_nivel , id_pueblo , imagen}
                ])
                .select('*')
                .single()

            if (error) throw error;

            res.status(201).json({
                msg:`ausuario creado correctamente`,
                personaje : data
            })


        }catch (error){

            res.status(500).json({
                msg:`error al intentar agregar personaje`,
                error: error.message
            })

        }
    }
    
}

module.exports = new Personajes();