# Contributing to ShopUp Kenya

## Code Style

- Use ESLint for JavaScript/TypeScript
- Use Prettier for code formatting
- Write meaningful commit messages
- Create feature branches

## Git Workflow

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Commit your changes**
```bash
git commit -m "feat: add new feature"
```

3. **Push to GitHub**
```bash
git push origin feature/your-feature-name
```

4. **Create a Pull Request**
- Describe your changes
- Link related issues
- Request review

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat(products): add product filtering

Implement product filtering by category and brand.
Users can now filter products using query parameters.

Closes #123
```

## Testing

All code must include tests:
- Unit tests for functions
- Integration tests for API endpoints
- E2E tests for user flows

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested this

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## Issues

When reporting issues, include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs
- Environment details

## Code Review Process

1. Peer review required
2. All tests must pass
3. No merge conflicts
4. Documentation updated
5. Approved by maintainer

## Development Tips

1. **Frontend Development**
   - Use React DevTools
   - Check Redux DevTools
   - Use Tailwind CSS utilities

2. **Backend Development**
   - Use Postman for API testing
   - Check database logs
   - Monitor Redis performance

3. **Admin Development**
   - Test all CRUD operations
   - Verify permissions
   - Check error handling

## Questions?

Feel free to:
- Open an issue
- Start a discussion
- Email: dev@shopup.ke

Happy coding! 🚀
