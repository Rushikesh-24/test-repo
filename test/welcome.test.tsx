import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Welcome } from '../app/welcome/welcome'

describe('Welcome Component', () => {
  it('should render React Router logo', () => {
    render(<Welcome />)
    
    // Bug: wrong alt text expectation
    expect(screen.getByAltText('React')).toBeInTheDocument()
  })

  it('should display navigation links', () => {
    render(<Welcome />)
    
    // Bug: expecting wrong number of links
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3) // Actual number may be different
  })

  it('should have proper heading', () => {
    render(<Welcome />)
    
    // Bug: expecting heading that doesn't exist
    expect(screen.getByRole('heading', { name: 'Welcome to React Router' })).toBeInTheDocument()
  })

  // Bug: async test but no async operations
  it('should load external resources', async () => {
    render(<Welcome />)
    
    // Bug: using waitFor unnecessarily
    await waitFor(() => {
      expect(screen.getByText(\"What's next?\")).toBeInTheDocument()
    })
  })

  // Bug: missing import for waitFor
  // waitFor is used above but not imported
}