import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// کامپوننت‌های عمومی
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Loader from './components/Loader';

// کامپوننت‌های پروژه‌ها (تمام ۱۸ کامپوننت import شوند)
import TruthTableGenerator from './projects/TruthTableGenerator';
import GraphVisualizer from './projects/GraphVisualizer';
import JoinMeetCalculator from './projects/JoinMeetCalculator';
import BooleanProductCalculator from './projects/BooleanProductCalculator';
import MatrixPowerCalculator from './projects/MatrixPowerCalculator';
import RelationPropertiesAnalyzer from './projects/RelationPropertiesAnalyzer';
import ReflexiveClosureCalculator from './projects/ReflexiveClosureCalculator';
import SymmetricClosureCalculator from './projects/SymmetricClosureCalculator';
import TransitiveClosureCalculator from './projects/TransitiveClosureCalculator';
import CompositionCalculator from './projects/CompositionCalculator';
import GraphVisualizerWithOptions from './projects/GraphVisualizerWithOptions';
import NodeDegreeCalculator from './projects/NodeDegreeCalculator';
import ComplementMatrixCalculator from './projects/ComplementMatrixCalculator';
import SubgraphChecker from './projects/SubgraphChecker';
import ConnectivityChecker from './projects/ConnectivityChecker';
import PathLengthCalculator from './projects/PathLengthCalculator';
import EulerianPathFinder from './projects/EulerianPathFinder';
import DijkstraPathfinder from './projects/DijkstraPathfinder';

const pageAnimation = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { type: "spring", stiffness: 120, damping: 20 }
};

const AppLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // این useEffect منطق لودینگ را مدیریت می‌کند
  useEffect(() => {
    setLoading(true); // نمایش لودر در ابتدای هر جابجایی
    const timeoutDuration = location.pathname === '/' ? 2200 : 700; // زمان طولانی‌تر برای بار اول
    const timer = setTimeout(() => setLoading(false), timeoutDuration);
    return () => clearTimeout(timer);
  }, [location.pathname]); // با هر تغییر مسیر، دوباره اجرا می‌شود

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageAnimation}
            className="animation-wrapper"
          >
            <Outlet /> 
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/project/truth-table" element={<TruthTableGenerator />} />
          <Route path="/project/graph-visualizer" element={<GraphVisualizer />} />
          <Route path="/project/join-meet" element={<JoinMeetCalculator />} />
          <Route path="/project/boolean-product" element={<BooleanProductCalculator />} />
          <Route path="/project/matrix-power" element={<MatrixPowerCalculator />} />
          <Route path="/project/relation-properties" element={<RelationPropertiesAnalyzer />} />
          <Route path="/project/reflexive-closure" element={<ReflexiveClosureCalculator />} />
          <Route path="/project/symmetric-closure" element={<SymmetricClosureCalculator />} />
          <Route path="/project/transitive-closure" element={<TransitiveClosureCalculator />} />
          <Route path="/project/composition" element={<CompositionCalculator />} />
          <Route path="/project/graph-visualizer-options" element={<GraphVisualizerWithOptions />} />
          <Route path="/project/node-degree" element={<NodeDegreeCalculator />} />
          <Route path="/project/complement-matrix" element={<ComplementMatrixCalculator />} />
          <Route path="/project/subgraph-checker" element={<SubgraphChecker />} />
          <Route path="/project/connectivity-checker" element={<ConnectivityChecker />} />
          <Route path="/project/path-length" element={<PathLengthCalculator />} />
          <Route path="/project/eulerian-path" element={<EulerianPathFinder />} />
          <Route path="/project/dijkstra" element={<DijkstraPathfinder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
