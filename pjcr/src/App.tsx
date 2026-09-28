/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, RegionData, LearningModule } from './types';
import { BackgroundShader } from './components/BackgroundShader';
import { TopNav } from './components/TopNav';
import { OverviewView } from './components/OverviewView';
import { LiveEarthView } from './components/LiveEarthView';
import { ClimateView } from './components/ClimateView';
import { EnvironmentView } from './components/EnvironmentView';
import { EnergyView } from './components/EnergyView';
import { IndiaMonitorView } from './components/IndiaMonitorView';
import { WarImpactView } from './components/WarImpactView';
import { AIClimateImpactView } from './components/AIClimateImpactView';
import { ClimateDataAnalyticsView } from './components/ClimateDataAnalyticsView';

import { ExportReportModal } from './components/modals/ExportReportModal';
import { ModuleDetailModal } from './components/modals/ModuleDetailModal';
import { RegionDetailModal } from './components/modals/RegionDetailModal';
import { SettingsModal } from './components/modals/SettingsModal';

import { Globe2, Layers, BookOpen, Wind, Zap, MapPin, BarChart2, ShieldAlert, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Modals state
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleSelectRegion = (region: RegionData) => {
    setSelectedRegion(region);
  };

  const handleOpenModule = (module: LearningModule) => {
    setSelectedModule(module);
  };

  const mobileNavItems: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Globe2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'war-impact', label: 'War', icon: ShieldAlert },
    { id: 'ai-impact', label: 'AI Boom', icon: Cpu },
    { id: 'live-earth', label: 'Earth', icon: Layers },
    { id: 'india', label: 'India', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative selection:bg-sky-500 selection:text-white flex flex-col font-sans">
      {/* Subtle WebGL Background Shader */}
      <BackgroundShader mode="subtle" />

      {/* Top Sticky Navigation Bar */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Dynamic Workspace */}
      <div className="flex flex-1 relative z-10 overflow-hidden w-full">
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-12">
          {activeTab === 'overview' && (
            <OverviewView
              onOpenExport={() => setIsExportOpen(true)}
              onSelectRegion={handleSelectRegion}
              onSelectLayerTab={(layer) => {
                if (layer === 'Temperature' || layer === 'CO2') {
                  setActiveTab('overview');
                }
              }}
            />
          )}

          {activeTab === 'analytics' && <ClimateDataAnalyticsView />}

          {activeTab === 'war-impact' && <WarImpactView />}

          {activeTab === 'ai-impact' && <AIClimateImpactView />}

          {activeTab === 'live-earth' && (
            <LiveEarthView
              onSelectRegion={handleSelectRegion}
              onOpenReportModal={() => setIsExportOpen(true)}
            />
          )}

          {activeTab === 'climate' && (
            <ClimateView onOpenModule={handleOpenModule} />
          )}

          {activeTab === 'environment' && <EnvironmentView />}

          {activeTab === 'energy' && <EnergyView />}

          {activeTab === 'india' && <IndiaMonitorView />}
        </main>
      </div>

      {/* Bottom Mobile Navigation Bar (Visible only on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-lg flex justify-around items-center px-2 z-50">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold uppercase transition-all ${
                isActive
                  ? 'text-sky-600 bg-sky-50 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals and Overlays */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />

      <RegionDetailModal
        region={selectedRegion}
        onClose={() => setSelectedRegion(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
