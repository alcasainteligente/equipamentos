import { 
  Lightbulb, 
  Zap, 
  Thermometer, 
  Shield, 
  Tv, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Speaker,
  Lock,
  Video,
  Blinds,
  Box,
  CloudRain,
  Droplets
} from 'lucide-react';

export type Category = 'lighting' | 'power' | 'climate' | 'security' | 'multimedia' | 'network';

export interface Device {
  id: string;
  name: string;
  category: Category;
  subCategory?: 'replace' | 'module';
  icon: any;
  description?: string;
}

export const DEVICES: Device[] = [
  // Lighting - Replace (Substituir Interruptores)
  { id: 'switch_1', name: 'Interruptor 1 Tecla', category: 'lighting', subCategory: 'replace', icon: Lightbulb },
  { id: 'switch_2', name: 'Interruptor 2 Teclas', category: 'lighting', subCategory: 'replace', icon: Lightbulb },
  { id: 'switch_3', name: 'Interruptor 3 Teclas', category: 'lighting', subCategory: 'replace', icon: Lightbulb },
  { id: 'dimmer', name: 'Dimmer (Regulador)', category: 'lighting', subCategory: 'replace', icon: Lightbulb },
  { id: 'led_strip', name: 'Fita LED (metros)', category: 'lighting', subCategory: 'replace', icon: Lightbulb },

  // Lighting - Modules (Manter Interruptores)
  { id: 'module_switch_1', name: 'Módulo 1 Canal', category: 'lighting', subCategory: 'module', icon: Box, description: 'Para manter o interruptor existente' },
  { id: 'module_switch_2', name: 'Módulo 2 Canais', category: 'lighting', subCategory: 'module', icon: Box, description: 'Para manter o interruptor existente' },
  { id: 'module_switch_3', name: 'Módulo 3 Canais', category: 'lighting', subCategory: 'module', icon: Box, description: 'Para manter o interruptor existente' },
  { id: 'module_dimmer', name: 'Módulo Dimmer', category: 'lighting', subCategory: 'module', icon: Box, description: 'Para manter o interruptor existente' },
  { id: 'led_strip_rgb', name: 'Fita LED RGB (metros)', category: 'lighting', subCategory: 'module', icon: Lightbulb, description: 'Fita multicolorida' },

  // Power
  { id: 'socket', name: 'Tomada Inteligente', category: 'power', icon: Zap },
  { id: 'socket_meter', name: 'Tomada com Medidor de Consumo', category: 'power', icon: Zap },
  { id: 'socket_module_16a', name: 'Módulo para Tomada 16A', category: 'power', icon: Zap },
  { id: 'energy_meter', name: 'Medidor de Energia (Quadro)', category: 'power', icon: Zap },

  // Climate & Blinds
  { id: 'thermostat', name: 'Termostato Inteligente', category: 'climate', icon: Thermometer },
  { id: 'ac_controller', name: 'Controlador de Ar Condicionado', category: 'climate', icon: Thermometer },
  { id: 'blinds_motor', name: 'Motor de Estores/Cortinas', category: 'climate', icon: Blinds },
  { id: 'blinds_switch', name: 'Comando de Estores', category: 'climate', icon: Blinds },
  { id: 'temp_humidity_sensor', name: 'Sensor Temperatura/Humidade', category: 'climate', icon: Thermometer },
  { id: 'rain_sensor', name: 'Sensor de Chuva', category: 'climate', icon: CloudRain },

  // Security
  { id: 'camera_indoor', name: 'Câmara Interior', category: 'security', icon: Video },
  { id: 'camera_outdoor', name: 'Câmara Exterior', category: 'security', icon: Video },
  { id: 'door_sensor', name: 'Sensor Porta/Janela', category: 'security', icon: Shield },
  { id: 'motion_sensor', name: 'Sensor de Movimento', category: 'security', icon: Shield },
  { id: 'flood_sensor', name: 'Sensor de Inundação', category: 'security', icon: Droplets },
  { id: 'smart_lock', name: 'Fechadura Inteligente', category: 'security', icon: Lock },
  { id: 'video_doorbell', name: 'Video Porteiro', category: 'security', icon: Video },

  // Multimedia & Control
  { id: 'central_hub', name: 'Hub Central', category: 'multimedia', icon: Box },
  { id: 'central_panel_4', name: 'Ecrã Central de Controlo 4" c/ Alexa build in', category: 'multimedia', icon: Monitor },
  { id: 'central_panel_10', name: 'Ecrã Central de Controlo 10" c/ Alexa build in', category: 'multimedia', icon: Monitor },
  { id: 'ir_hub', name: 'Hub Infravermelhos (TV/Som)', category: 'multimedia', icon: Tv },
  { id: 'virtual_assistant', name: 'Assistente Virtual', category: 'multimedia', icon: Speaker },

  // Network
  { id: 'mesh_point_1', name: 'Ponto de Acesso Wi-Fi Mesh (1 Router)', category: 'network', icon: Wifi },
  { id: 'mesh_point_2', name: 'Ponto de Acesso Wi-Fi Mesh (2 Routers)', category: 'network', icon: Wifi },
  { id: 'mesh_point_3', name: 'Ponto de Acesso Wi-Fi Mesh (3 Routers)', category: 'network', icon: Wifi },
];

export const CATEGORIES: { id: Category; label: string; icon: any }[] = [
  { id: 'lighting', label: 'Iluminação', icon: Lightbulb },
  { id: 'power', label: 'Energia', icon: Zap },
  { id: 'climate', label: 'Clima & Estores', icon: Blinds },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'multimedia', label: 'Controlo & Multimédia', icon: Monitor },
  { id: 'network', label: 'Rede', icon: Wifi },
];

export const IDEAS = [
  {
    title: "Básico: Conforto Inicial",
    description: "Comece pelo essencial. Controle as luzes da sala e do quarto pelo telemóvel e programe as tomadas para desligar aparelhos em stand-by.",
    level: "Iniciante",
    color: "bg-blue-50 border-blue-200 text-blue-800"
  },
  {
    title: "Intermédio: Automação Total",
    description: "Sensores de movimento que acendem luzes, estores que abrem com o nascer do sol e termostatos que ajustam a temperatura antes de chegar a casa.",
    level: "Avançado",
    color: "bg-purple-50 border-purple-200 text-purple-800"
  },
  {
    title: "Premium: Casa do Futuro",
    description: "Integração total. Câmaras com IA, som ambiente em todas as divisões, ecrãs centrais de controlo e cenários complexos de 'Cinema' ou 'Férias'.",
    level: "Expert",
    color: "bg-emerald-50 border-emerald-200 text-emerald-800"
  }
];
