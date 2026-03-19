const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [firebaseData, setFirebaseData] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  // --- EFECTO 1: ESCUCHA DE DATOS ESTABLE ---
  useEffect(() => {
    const resultsRef = ref(db, "results");
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(updateResults(data)); 
        setFirebaseData(data); 
      }
      setLoading(false); // Ya tenemos respuesta (exista o no la rama)
    }, (error) => {
      console.error("Error en Firebase:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  // --- EFECTO 2: LÓGICA DE NAVEGACIÓN CORREGIDA ---
  useEffect(() => {
    if (!firebaseData) return;

    const { showResultPage, showVotingScreen } = firebaseData;
    const path = location.pathname;

    const isControlOrAdmin = path === "/control-panel" || path === "/val-jan" || path === "/traer";
    
    if (showResultPage && !isControlOrAdmin && path !== "/results") {
      navigate("/results");
      return;
    }

    if (showVotingScreen === false && path === "/vote") {
      navigate("/");
      return;
    }
  }, [firebaseData, location.pathname, navigate]);

  // PANTALLA DE CARGA (Evita que el resto del código falle)
  if (loading) {
    return (
      <AppContainer>
        <AnimatedBackground />
        <div style={{ zIndex: 100, color: "#8c6a53", fontFamily: "serif" }}>
          <h3>Cargando celebración...</h3>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <AnimatedBackground />
      <FloatingIconsWrapper>
        <FloatingIcons />
      </FloatingIconsWrapper>

      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/control-panel" element={<ControlPanel />} />
          <Route path="/traer" element={<WhatToBring />} />
          <Route path="/val-jan" element={<ValJan />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};

export default App;
