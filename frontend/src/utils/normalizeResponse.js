export function normalizeListResponse(data) {
    const unwrapped = data?.cached && data?.data ? data.data : data;
    return {
        items: unwrapped?.data || [],
        total: unwrapped?.total || 0,
        page: unwrapped?.page || 1,
        limit: unwrapped?.limit || 10
    };
}

export function normalizeSingleResponse(data) {
    const unwrapped = data?.cached && data?.data ? data.data : data;
    return unwrapped?.data || unwrapped || null;
}
