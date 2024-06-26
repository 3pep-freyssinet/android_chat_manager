const models 		  = require('../models');
const Op 	 		  = require("sequelize").Op;
const { QueryTypes }  = require('sequelize');
const connected_users = require('../../common-data');

console.log("'controllers/index.js' : models = " + Object.keys(models));

const createNote = async (req, res) => {
  try {
    //const note = await models.Notes.create(req.body);
	const note = await models.Notes.create({ note: '10', ideleves: '5'});
    return res.status(201).json({note});
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

//Add notes
const createNotes = async (req, res) => {
  try {
    //const note = await models.Notes.create(req.body);
	
	var data = [
	  { note: '20', ideleves: '1' },
	  { note: '20', ideleves: '1' },
	  { note: '20', ideleves: '1' }
	];
	const notes = await models.Notes.bulkCreate(data);
	
	return res.status(201).json({notes});

	} catch (error) {
		return res.status(500).json({error: error.message})
	}
}



//Get connected users
const getConnectedUsers = async (req, res) => {
	//console.log("getConnectedUsers : connected_users.connected_users = " + connected_users.connected_users);
	
	const users = {"getting": 'hello the world', "connected_users": connected_users.connected_users};
	
	return res.status(200).json({ users });
};

//Get all users
const getAllUsers = async (req, res) => {
	//const users = {"name": 'tom'};
	//return res.status(200).json({ users });
  
  
  try {
    
	/*
	var query = `SELECT nickname,` 									    +
					`encode(imageprofile, 'escape') as imageprofile,`	+
					`status,` 											+
					`connected,` 										+
					`lastconnected,`									+ 
					`disconnected,` 									+
					`blacklistauthor,` 									+
					`notseenmessages,` 									+
					`connectedwith ` 									+
		`FROM users ` 													+
		`ORDER BY nickname ASC `; 
	*/
	
	//use backtick (`) to allow placeholder, which are embedded expressions delimited by a dollar sign and curly braces: ${expression}
	//const users = await models.sequelize.query(SELECT encode(imageprofile, \'escape\') as imageprofile FROM `Users`', {
	const users = await models.sequelize.query(`SELECT  id,
														nickname, 
														encode(imageprofile, 'escape') as imageprofile,
														status,
														connected,
														lastconnected,
														disconnected,
														blacklistauthor,
														notseenmessages,
														connectedwith
												FROM Users`, { //error in 'ORDER BY nickname ASC'	
	
						type: QueryTypes.SELECT, //perhaps also : 'QueryTypes.RAW'
	});

	//const users = await models.Users.findAll({
    
        // Add order conditions here....
		
    //    order: [
    //        ['id', 'ASC'],
            //['trimestre', 'ASC'],
    //    ]
	     
	
	
	/*
     attributes: ['foo', 'bar'], //To select only some attributes as SELECT foo, bar FROM ...
	 attributes: ['foo', ['bar', 'baz'], 'qux'], // SELECT foo, bar AS baz, qux FROM ...
	 attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar'], // SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
	 attributes: { exclude: ['baz'] }, //-- Assuming all columns are 'id', 'foo', 'bar', 'baz' and 'qux', SELECT id, foo, bar, qux FROM ...
	*/
	
	 /*
	  include: [
        {
          model: models.Comment,
          as: 'comments'
        },
        {
          model: models.User,
          as: 'author'
        }
      ]
	  */
    //});
	
	
	//console.log("//////JSON.stringify(users) = " + JSON.stringify(users)); //[{"id":1,"note":12,"trimestre":2,"ideleves":1}, .....
	
	//const notes_ = JSON.stringify(users);
	
	const users_  = Array.from(Object.values(users));
	
	console.log("//////type of users_[0].imageprofile = " + typeof users_[0].imageprofile);
	console.log("//////(users_[0].imageprofile) = " + users_[0].imageprofile); // /9j/4AAQS....o0ul1//9k=
	//console.log("//////JSON.stringify(users_[0].imageprofile) = " + JSON.stringify(users_[0].imageprofile)); //  "/9j/4AAQS....o0ul1//9k="
	
	//const base64Image  = Buffer.from(users_[0].imageprofile).toString('base64'); // Convert.ToBase64String(users_[0].imageprofile.data);
	//const base64Image_ = btoa(String.fromCharCode.apply(null, new Uint8Array(users_[0].imageprofile)));
	
	console.log("");
	console.log("");
	console.log("");
	//console.log("//////users_[0].imageprofile base 64 length= " + base64Image);
	
	//console.log("//////users_[0].imageprofile.length) = " + users_[0].imageprofile.length);
	
  return res.render('pages/all_users', {
		users_ //it must be the same in target : 'all_users.ejs'
  });
 
  
  //return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send("getAllUsers error : "+error.stack); //error.message
  }
}//getAllUsers


//Get all notes
const getAllNotes = async (req, res) => {
	//const notes = {"name": 'tom'};
	//return res.status(200).json({ notes });
  
  try {
    const notes = await models.Notes.findAll({
    
        // Add order conditions here....
        order: [
            ['ideleves', 'ASC'],
            ['trimestre', 'ASC'],
        ]
	
	
	
	/*
     attributes: ['foo', 'bar'], //To select only some attributes as SELECT foo, bar FROM ...
	 attributes: ['foo', ['bar', 'baz'], 'qux'], // SELECT foo, bar AS baz, qux FROM ...
	 attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar'], // SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
	 attributes: { exclude: ['baz'] }, //-- Assuming all columns are 'id', 'foo', 'bar', 'baz' and 'qux', SELECT id, foo, bar, qux FROM ...
	*/
	
	 /*
	  include: [
        {
          model: models.Comment,
          as: 'comments'
        },
        {
          model: models.User,
          as: 'author'
        }
      ]
	  */
    });
	
	console.log("//////type of notes = " + typeof notes);
	//console.log("//////JSON.stringify(notes) = " + JSON.stringify(notes)); //[{"id":1,"note":12,"trimestre":2,"ideleves":1}, .....
	
	//const notes_ = JSON.stringify(notes);
	
	const notes_ = Array.from(Object.values(notes));
	
	//console.log("//////array (notes) = " + notes_); 
	//console.log("//////array (notes) = " + notes_[0].id);
	
  return res.render('pages/all_notes', {
		notes_
  });
 
  
  //return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("getAllNotes error : "+error.stack); //error.message
  }
  
}//getAllNotes

//Get student info, classroom and mark knowing note id.
const getOneNoteById = async (req, res) => {
  try {
    const { postId } = req.params;
	const note = await models.Notes.findOne({
      where: { id: postId },
     include: 
	 [
		{
		  model: models.Eleves,
		  as: 'author', 
		  include:
		  [
				{
					model: models.Classes,
					as: 'section',
				}
		  ]
		},
	]
	  
	 
	 /*
	  include: [
        {
          model: models.Comment,
          as: 'comments'
        },
        {
          model: models.User,
          as: 'author'
        }
      ]
	  */
    });
    if (note) {
		const eleve = await note.author.nom;
		console.log("eleve = "+eleve); 
		return res.status(200).json({ note });
    }
    return res.status(404).send(`Note with the specified ID = ${postId} does not exists`);
  
  } catch (error) {
    return res.status(500).send(error.message);
  }
  
}

//update one note by its id  , 
const updateOneNote = async (req, res) => {
  try {
    const { postId }  = req.params;
	var data = { note: '20', ideleves: '6' };
	  
    const [ updated ] = await models.Notes.update(data, //update(req.body
	{where: { id: postId } });
    if (updated) {
      const updatedNote = await models.Notes.findOne({ where: { id: postId } }); //get the updated row to display it.
      return res.status(200).json({ note: updatedNote });
    }
    throw new Error('Note to update not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//Delete one note
const deleteNote = async (req, res) => {
  try {
    const { postId } = req.params;
    const deleted = await models.Notes.destroy({
      where: { id: postId }
    });
    if (deleted) {
		return res.status(204).send("Note deleted");	//original
    }
    throw new Error("Note to delete with id = "+postId+" not found");
  } catch (error) {
		return res.status(500).send(error.message);
  }
};

	//Get student identity, classroom and mark knowing student id.
	const getClassOneEleveById = async (req, res) => {
		try {
			const { postId } = req.params;
			const eleve = await models.Eleves.findOne({
			  where: { id: postId },
			  
			 include: 
			 [
				{
				  model: models.Classes,
				  as: 'section',
				},
				
				{
				   model: models.Notes,
						as: 'notes',
				}
			 ]
			
			 
			 /*
			  include: [
				{
				  model: models.Comment,
				  as: 'comments'
				},
				{
				  model: models.User,
				  as: 'author'
				}
			  ]
			  */
			});
			if (eleve) {
				//const eleve = await eleve.section.classe;
				//console.log("eleve = "+eleve); 
				return res.status(200).json({ eleve });
			}
			return res.status(404).send('Eleve with the specified ID = ${postId} does not exists');
	  
		} catch (error) {
			return res.status(500).send(error.message);
		}
	}
	
	//Get all students info and classes knowing name or part of name
	const getAllStudents = async (req, res) => {
	  try {
		const { name } = req.params;
		const students = await models.Eleves.findAll({
		 where: { nom: {[Op.like]: '%'+name+'%'} },	//where: { nom: {[Op.like]: '%t%'} },
		 attributes: ['nom', 'prenom', ['tel', 'telephone']],  //keep column = 'nom', 'prenom', 'tel' AS 'telephone'
		order: 
		[
            ['id', 'ASC'],	//DESC
            ['nom', 'ASC'],
        ],
		  include: [
			{
				
				  model: models.Classes,
				  as: 'section',
				
				  //attributes:  {
				  //		exclude: ['id']		//not keep the column 'id'
				  //},
				  attributes:['classe'],		//keep only column 'classes'
			}		
		  ]
		  
		});
		return res.status(200).json({ students });
	  } catch (error) {
		return res.status(500).send("getAllStudents error : "+error.stack); //error.message
	  }
	};

module.exports = {
  createNote,
  createNotes,
  getOneNoteById,
  getAllNotes,
  getAllUsers,
  getConnectedUsers,
  updateOneNote,
  deleteNote,
  getClassOneEleveById,
  getAllStudents
}