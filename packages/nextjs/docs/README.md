# Documentation Index

Welcome to the Owrent Scaffold-ETH 2 documentation!

## API Documentation

### Chat API (Civic Nexus AI)

- **[Complete API Reference](./API.md)** - Detailed documentation of the `/api/chat` endpoint

  - Request/response formats
  - Authentication requirements
  - Error handling
  - Message validation
  - Tool calling (Nexus integration)
  - Configuration options
  - Usage examples
  - Debugging guide

- **[Quick Reference](./CHAT_API_QUICK_REFERENCE.md)** - Quick lookup guide

  - Endpoint summary
  - Common errors
  - Status codes
  - Usage examples
  - Environment variables

- **[Changelog](./CHANGELOG_CHAT_API.md)** - Version history

  - v1.2.0: Manual message conversion for AI SDK compatibility
  - v1.1.0: Enhanced message validation & error handling
  - v1.0.0: Initial release

- **[Testing Guide](./AI_CHAT_TESTING.md)** - Comprehensive testing documentation

  - Quick test procedures
  - Manual testing scenarios
  - API testing with cURL
  - Performance testing
  - Troubleshooting guide
  - Automated testing examples

- **[Implementation Guide](./AI_CHAT_IMPLEMENTATION.md)** - Complete implementation documentation
  - Current status and features
  - Technical implementation details
  - Component structure and code examples
  - UI components and styling
  - Configuration and setup
  - Testing procedures
  - Known limitations and future enhancements

## Design System Documentation

### Glassmorphism UI Redesign

- **[Design System](./DESIGN_SYSTEM.md)** - Complete design system documentation
  - Color system (light/dark mode)
  - Typography scale
  - Spacing and layout
  - Component patterns
  - Glassmorphism effects

- **[Icon System](./ICON_SYSTEM.md)** - Icon usage guidelines
  - Icon library (@heroicons/react)
  - Standard sizes and contexts
  - Semantic icon mapping
  - Accessibility requirements
  - Color contrast guidelines
  - Usage examples and best practices

- **[Icon System Audit](./ICON_SYSTEM_AUDIT.md)** - Icon audit results
  - Current icon usage analysis
  - Standardization recommendations
  - Migration checklist

- **[Spacing & Layout System](./SPACING_LAYOUT_SYSTEM.md)** - Layout guidelines
  - Spacing scale
  - Layout patterns
  - Responsive design
  - Grid system

## Feature Documentation

### Civic Auth Integration

See main [README.md](../../../README.md#civic-auth-integration) for:

- Setup and configuration
- Usage patterns (client-side, server-side, API routes)
- Migration from RainbowKit
- Testing guides

### FHEVM Integration

See [ZAMA Documentation](https://docs.zama.ai/) for:

- Fully Homomorphic Encryption basics
- FHEVM contract development
- Encrypted types (euint8, euint16, etc.)
- Client-side encryption

## Testing Documentation

Located in `packages/nextjs/`:

- **[TESTING_CHECKLIST.md](../TESTING_CHECKLIST.md)** - Manual testing checklist
- **[TESTING_SUMMARY.md](../TESTING_SUMMARY.md)** - Complete testing summary
- **[scripts/](../scripts/)** - Automated test scripts

## Project Documentation

Located in `.kiro/steering/`:

- **[project-overview.md](../../../.kiro/steering/project-overview.md)** - Project overview
- **[tech.md](../../../.kiro/steering/tech.md)** - Technology stack
- **[structure.md](../../../.kiro/steering/structure.md)** - File structure
- **[architecture.md](../../../.kiro/steering/architecture.md)** - System architecture
- **[coding-standards.md](../../../.kiro/steering/coding-standards.md)** - Code conventions
- **[development-workflow.md](../../../.kiro/steering/development-workflow.md)** - Dev processes
- **[deployment-guide.md](../../../.kiro/steering/deployment-guide.md)** - Deployment instructions
- **[civic-auth-guide.md](../../../.kiro/steering/civic-auth-guide.md)** - Civic Auth guide
- **[testing-guide.md](../../../.kiro/steering/testing-guide.md)** - Testing guide

## External Resources

### Civic

- [Civic Auth Dashboard](https://auth.civic.com)
- [Civic Nexus Dashboard](https://nexus.civic.com)
- [Civic Documentation](https://docs.civic.com)

### AI Providers

- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com)

### Blockchain

- [Scaffold-ETH 2 Docs](https://docs.scaffoldeth.io)
- [ZAMA Docs](https://docs.zama.ai)
- [Hardhat Docs](https://hardhat.org/docs)
- [Wagmi Docs](https://wagmi.sh)
- [Viem Docs](https://viem.sh)

### Frontend

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [DaisyUI](https://daisyui.com)

## Contributing

See [CONTRIBUTING.md](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Support

- **GitHub Issues**: [scaffold-eth/scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2/issues)
- **Discord**: [Scaffold-ETH Discord](https://discord.gg/scaffoldeth)
- **Civic Support**: Contact through [Civic Auth Dashboard](https://auth.civic.com)

## License

MIT License - see [LICENSE](../../../LICENSE) for details.
