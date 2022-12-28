export default {
   clearMocks: true,
   collectCoverage: true,
   coverageDirectory: "coverage",
   coverageProvider: "v8",
   coverageReporters: ["json"],

   //setup do jest
   setupFilesAfterEnv: ["./tests/jest.setup.ts"],

   //Config para dizer onde fica os arquivos de teste, sempre dentro da pasta tests
   testMatch: ["<rootDir>/tests/**/*.test.ts"],

   // Configuração para dizer ao jest para usar o pacote ts-jest para rodar com typescript
   // pois o jest sozinho só roda JavaScript
   transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
   },
};
