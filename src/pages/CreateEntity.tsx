import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { addEntity } from '@/features/entities/entitySlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateEntityName, validateEntityIdentifier } from '@/utils/validators';

export function CreateEntity() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [errors, setErrors] = useState<{ name?: string | undefined; identifier?: string | undefined }>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameError = validateEntityName(name);
    const identifierError = validateEntityIdentifier(identifier);
    
    if (nameError || identifierError) {
      setErrors({
        name: nameError || undefined,
        identifier: identifierError || undefined
      });
      return;
    }
    
    dispatch(addEntity({ name: name.trim(), identifier: identifier.trim() }));
    navigate('/entities');
  };
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Entity</h1>
        <p className="text-muted-foreground">
          Add a new entity for Schedule K-2 Part II data entry
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Entity Information</CardTitle>
          <CardDescription>
            Enter the basic information for this entity. You can add Part II data after creating the entity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Entity Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., ABC Corporation"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="identifier" className="text-sm font-medium">
                Tax Identifier / EIN <span className="text-destructive">*</span>
              </label>
              <Input
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g., 12-3456789"
                className={errors.identifier ? 'border-destructive' : ''}
              />
              {errors.identifier && (
                <p className="text-sm text-destructive">{errors.identifier}</p>
              )}
            </div>
            
            <Alert>
              <AlertDescription>
                New entities are created with DRAFT status by default. You can add Part II data
                and then change the status to SUBMITTED when ready for aggregation.
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => navigate('/entities')}>
                Cancel
              </Button>
              <Button type="submit">
                Create Entity
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
