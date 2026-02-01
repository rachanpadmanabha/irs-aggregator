import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { deleteEntity, setEntityStatus } from '@/features/entities/entitySlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateShort } from '@/utils/format';
import { hasEntityData, countTotalCountries } from '@/utils/warnings';

export function EntityList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const entities = useAppSelector(state => state.entities);
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'updated'>('updated');
  
  const entityList = entities.allIds
    .map((id: string) => ({
      ...entities.byId[id]!,
      hasData: hasEntityData(entities.entityData[id]),
      countryCount: countTotalCountries(entities.entityData[id])
    }))
    .sort((a: typeof entityList[0], b: typeof entityList[0]) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entity? This action cannot be undone.')) {
      dispatch(deleteEntity(id));
    }
  };
  
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'DRAFT' ? 'SUBMITTED' : 'DRAFT';
    dispatch(setEntityStatus({ id, status: newStatus }));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Entities
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            Manage entities for Schedule K-2 Part II data entry
          </p>
        </div>
        <Button onClick={() => navigate('/entities/new')} size="lg">
          <span className="mr-2 text-lg">➕</span> Add Entity
        </Button>
      </div>
      
      {entityList.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Entities</CardTitle>
            <CardDescription>
              You haven't created any entities yet. Click "Add Entity" to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/entities/new')}>
              Add Entity
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Entity List ({entityList.length})</CardTitle>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => setSortBy('name')}
                  className={sortBy === 'name' ? 'font-bold underline' : 'text-muted-foreground'}
                >
                  Name
                </button>
                <span className="text-muted-foreground">•</span>
                <button
                  onClick={() => setSortBy('status')}
                  className={sortBy === 'status' ? 'font-bold underline' : 'text-muted-foreground'}
                >
                  Status
                </button>
                <span className="text-muted-foreground">•</span>
                <button
                  onClick={() => setSortBy('updated')}
                  className={sortBy === 'updated' ? 'font-bold underline' : 'text-muted-foreground'}
                >
                  Updated
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Identifier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entityList.map((entity) => (
                  <TableRow key={entity.id}>
                    <TableCell className="font-bold text-foreground">{entity.name}</TableCell>
                    <TableCell className="text-muted-foreground font-mono">{entity.identifier}</TableCell>
                    <TableCell>
                      <Badge variant={entity.status === 'SUBMITTED' ? 'success' : 'warning'}>
                        {entity.status === 'SUBMITTED' ? '✓ SUBMITTED' : '📝 DRAFT'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {entity.hasData ? `${entity.countryCount} countries` : 'No data'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDateShort(entity.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/entities/${entity.id}`)}
                        >
                          Edit Data
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(entity.id, entity.status)}
                        >
                          {entity.status === 'DRAFT' ? 'Submit' : 'Unsubmit'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(entity.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
