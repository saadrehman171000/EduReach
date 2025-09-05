import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { theme } from '../../theme';
import { EmptyState, ErrorState, LoadingSkeleton } from '../../components';

const { width } = Dimensions.get('window');

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: number;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  error?: boolean;
  emptyMessage?: string;
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function AdminTable({
  columns,
  data,
  loading = false,
  error = false,
  emptyMessage = 'No data available',
  onSort,
  sortColumn,
  sortDirection = 'asc',
  showPagination = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: AdminTableProps) {
  const isWideScreen = width > 768;

  const renderSortIcon = (column: Column) => {
    if (!column.sortable) return null;
    
    const isActive = sortColumn === column.key;
    const icon = isActive 
      ? (sortDirection === 'asc' ? '↑' : '↓')
      : '↕';
    
    return (
      <Text style={[styles.sortIcon, isActive && styles.sortIconActive]}>
        {icon}
      </Text>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {columns.map((column) => (
        <TouchableOpacity
          key={column.key}
          style={[
            styles.headerCell,
            { flex: column.width || 1 },
            column.align === 'right' && styles.headerCellRight,
            column.align === 'center' && styles.headerCellCenter,
          ]}
          onPress={() => column.sortable && onSort?.(column.key)}
          disabled={!column.sortable}
        >
          <Text style={[
            styles.headerText,
            column.sortable && styles.headerTextSortable,
          ]}>
            {column.title}
          </Text>
          {renderSortIcon(column)}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRow = (row: any, index: number) => (
    <View key={index} style={styles.row}>
      {columns.map((column) => (
        <View
          key={column.key}
          style={[
            styles.cell,
            { flex: column.width || 1 },
            column.align === 'right' && styles.cellRight,
            column.align === 'center' && styles.cellCenter,
          ]}
        >
          <Text style={styles.cellText}>
            {row[column.key] || '—'}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderCardRow = (row: any, index: number) => (
    <View key={index} style={styles.cardRow}>
      {columns.map((column) => (
        <View key={column.key} style={styles.cardCell}>
          <Text style={styles.cardLabel}>{column.title}</Text>
          <Text style={styles.cardValue}>
            {row[column.key] || '—'}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null;

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
          onPress={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={[styles.paginationButtonText, currentPage === 1 && styles.paginationButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </Text>
        
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
          onPress={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={[styles.paginationButtonText, currentPage === totalPages && styles.paginationButtonTextDisabled]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSkeleton.SkeletonList count={5} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load data"
          subtitle="Please try again later"
        />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="📊"
          title={emptyMessage}
          subtitle="No data matches your current filters"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isWideScreen ? (
        <>
          {renderHeader()}
          {data.map(renderRow)}
        </>
      ) : (
        data.map(renderCardRow)
      )}
      {renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray50,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  headerCell: {
    padding: theme.spacing.md,
    borderRightWidth: 1,
    borderRightColor: theme.colors.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerCellRight: {
    justifyContent: 'flex-end',
  },
  headerCellCenter: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  headerTextSortable: {
    color: theme.colors.textSecondary,
  },
  sortIcon: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  sortIconActive: {
    color: theme.colors.primary,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  cell: {
    padding: theme.spacing.md,
    borderRightWidth: 1,
    borderRightColor: theme.colors.gray200,
    justifyContent: 'center',
  },
  cellRight: {
    alignItems: 'flex-end',
  },
  cellCenter: {
    alignItems: 'center',
  },
  cellText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  cardRow: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
  },
  cardCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  cardLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  cardValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: '600' as const,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray50,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
  },
  paginationButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
  },
  paginationButtonDisabled: {
    backgroundColor: theme.colors.gray300,
  },
  paginationButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  paginationButtonTextDisabled: {
    color: theme.colors.textSecondary,
  },
  paginationInfo: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
});
