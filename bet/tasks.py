from celery.schedules import crontab
from celery.task import periodic_task
from django.utils import timezone

from .models import WalletRequested

@periodic_task(run_every=crontab(minute='*/5'))
def delete_old_foos():
    # Query all the foos in our database
    foos = WalletRequested.objects.filter(is_complete=False)

    # Iterate through them
    for foo in foos:
        # If the expiration date is bigger than now delete it
        if foo.expiration_date < timezone.now():
            foo.delete()
            # log deletion
    return "completed deleting foos at {}".format(timezone.now())