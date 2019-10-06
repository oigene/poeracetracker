import Joi from '@hapi/joi';
import constants from '../common/constants';

class RaceEvent {
  constructor(raceId, type, name, time) {
    this.schema = Joi.object({
      created: Joi.date().default(Date.now()),
      raceId: Joi.string()
        .guid({
          version: ['uuidv4']
        })
        .required(),
      name: Joi.string().required(),
      type: Joi.string()
        .valid(constants.EVENTTYPE_ZONES, constants.EVENTTYPE_LEVELS)
        .required(),
      time: Joi.number().greater(0)
    });
    this.obj = {
      raceId,
      type,
      name,
      time
    };

    return this.validate();
  }

  validate() {
    const { value, error } = this.schema.validate(this.obj);

    if (error) {
      throw error;
    }

    return value;
  }
}

export default RaceEvent;
