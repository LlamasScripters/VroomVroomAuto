// src/incident/incident.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  createIncidentDTO,
  updateIncidentDTO,
  deleteIncidentDTO,
  getIncidentDTO
} from '../../../../../application/dtos/IncidentDTO';
import { IncidentUseCases } from '../../../../../application/usecases/incident/IncidentCrudUseCases';

@Controller('api/nestJs/incident')
export class IncidentController {
  constructor(
    @Inject('IncidentUseCases')
    private readonly incidentUseCases: IncidentUseCases,
  ) {}

  @Get()
  async getAllIncidents() {
    try {
      const incidents = await this.incidentUseCases.getAllIncidents();
      return incidents;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createIncident(@Body() data: createIncidentDTO) {
    try {
      const result = await this.incidentUseCases.createIncident(data);
      return {
        message: 'Incident créé avec succès',
        incidentId: result.incidentId,
      };
    } catch (error : any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getIncident(@Param('id') incidentId: string) {
    try {
      const incident = await this.incidentUseCases.getIncidentById({ incidentId });
      if (!incident) {
        throw new HttpException('Incident introuvable', HttpStatus.NOT_FOUND);
      }
      return incident; 
    } catch (error : any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateIncident(@Param('id') incidentId: string, @Body() partialUpdate: updateIncidentDTO) {
    console.log('partialUpdate', partialUpdate);
    console.log('incidentId', incidentId);
    try {
      const updated = await this.incidentUseCases.updateIncident({
        incidentId,
        ...partialUpdate
      }); 
      console.log('updated', updated);
      if (!updated) {
        throw new HttpException('Incident introuvable', HttpStatus.NOT_FOUND);
      }
      return { message: 'Incident mis à jour', updated };
    } catch (error: any) {
      throw new HttpException("test "+ error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteIncident(@Param('id') incidentId: string) {
    try {
      const success = await this.incidentUseCases.deleteIncident({ incidentId });
      if (!success) {
        throw new HttpException('Incident introuvable', HttpStatus.NOT_FOUND);
      }
      return { message: 'Incident supprimé avec succès' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
