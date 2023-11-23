import apiClient from '../../apiClient';

export interface Params {
  limit: number;
  offset: number;
}

enum Api {
  HVMotors = '/v1/intools/electra/materials/motor/high-voltage',
}

const getAllMaterialsHVMotor = (params: Params) => apiClient.get({ url: Api.HVMotors, params });

export default {
  getAllMaterialsHVMotor,
};
