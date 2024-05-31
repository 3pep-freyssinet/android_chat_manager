const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	  
    }
  }
  
  Notes.init(
  {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     note: DataTypes.INTEGER,
	 trimestre: DataTypes.INTEGER,
     ideleves: DataTypes.INTEGER,
	 //createdAt: false,	//remove these statements if there are no corresponding columns in the original table. Put 'timestamps: false below.
     //updatedAt: false
    },
    {
      // options
      sequelize,
      modelName: 'Notes',
      tableName: 'notes',
	  timestamps: false,
      underscore: true
    },
  );
  Notes.associate = function(models) {
    // associations can be defined here
	Notes.belongsTo(models.Eleves, {
      foreignKey: 'ideleves',
      as: 'author',
      onDelete: 'CASCADE',
    })
  }
  return Notes;
};