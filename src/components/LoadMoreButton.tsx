interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

export function LoadMoreButton({
  onLoadMore,
  loading,
  hasMore,
}: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="load-more-container">
      <button
        type="button"
        className="load-more-button"
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load More Pokémon'}
      </button>
    </div>
  );
}
