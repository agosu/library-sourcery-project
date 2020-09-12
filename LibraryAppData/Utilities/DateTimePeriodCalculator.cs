using System;

namespace LibraryAppData.Utilities
{
    public class DateTimePeriodCalculator
    {
        public static DateTime NewestBookTimeFilter(int time)
        {
            var current = DateTime.Now;
            return current.AddDays(time);
        }
    }
}
