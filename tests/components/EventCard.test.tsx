import { render, screen } from '@testing-library/react';
import EventCard from '@/storyblok-components/EventCard';
import React from 'react';

describe('EventCard', () => {
  it('renders basic event info', () => {
    render(
      <EventCard
        blok={{
          _uid: '1',
          image: { filename: '/placeholder.jpg' },
          title: 'My Event',
          start: '2024-01-01',
          venue: 'The Venue',
          summary: 'A short summary',
          tags: ['tag1'],
          price: 'Free',
        }}
      />
    );

    expect(screen.getByText('My Event')).toBeInTheDocument();
    expect(screen.getByText('The Venue')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
  });
});
