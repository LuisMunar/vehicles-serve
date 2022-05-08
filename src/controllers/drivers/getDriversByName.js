const Sequelize = require('sequelize')

const { DriverModel } = require('../../models')
const { setFormatResponse } = require('../../helpers')

const getDriversByName = async (req, res, next) => {
  try {
    const { name } = req.params
    const nameArray = name.split(' ')

    if(nameArray.length>1) {
      const promisesArray = []

      nameArray.forEach(itemName => {
        promisesArray.push(
          DriverModel.findAll({
            attributes: [
              [Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 'full_name'],
              'id',
              'company_id',
              'city',
              'first_name',
              'last_name',
              'email',
              'phone',
              'avatar_url',
              'status',
              'creation_date'
            ],
            where: {
              [Sequelize.Op.or]: [
                { first_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('first_name')), 'LIKE', '%' + itemName.toLowerCase() + '%') },
                { last_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('last_name')), 'LIKE', '%' + itemName.toLowerCase() + '%') }
              ]
            },
            order: [['id', 'ASC']]
          })
        )
      })

      const resultPromiseArray = await Promise.allSettled(promisesArray)
      const resultPromiseArrayFlat = resultPromiseArray.map(res => res.value).flat(Infinity)
      const resultArrayWithoutDuplicates = [...new Map(resultPromiseArrayFlat.map(item => [JSON.stringify(item), item])).values()]
      const filterByParamName = resultArrayWithoutDuplicates.filter(driver => {
        return `${ driver.first_name.toLowerCase() } ${ driver.last_name.toLowerCase() }`.includes(name.toLowerCase())
      })
      setFormatResponse(res, 200, filterByParamName)
      return
    }

    let allDrivers = await DriverModel.findAll({
      where: {
        [Sequelize.Op.or]: [
          { first_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('first_name')), 'LIKE', '%' + name.toLowerCase() + '%') },
          { last_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('last_name')), 'LIKE', '%' + name.toLowerCase() + '%') }
        ]
      },
      order: [['id', 'ASC']]
    })

    setFormatResponse(res, 200, allDrivers)
  } catch (error) {
    next(error)
  }
}

module.exports = getDriversByName